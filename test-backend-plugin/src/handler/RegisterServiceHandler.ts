
import * as theia from '@theia/plugin';
import { OperationCanceledError } from "../Errors";
import { IStep } from './IStep';
import { IServiceData } from './IServiceData';
import { SpecifyServiceIdStep } from './SpecifyServiceIdStep';
import * as bent from 'bent';

const postJson = bent('POST', {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
}, 'json', 201);

export class RegisterServiceHandler {

    private metadata: IServiceData;
    private serviceRegistryUrl: string;

    constructor() {
        this.metadata = {
            serviceId: "",
            serviceUrl: ""
        };
        this.serviceRegistryUrl = theia.workspace.getConfiguration("smartclide.testplugin").get<string>("defaultServiceUrl") || "http://localhost:8080/services";
    }

    protected get failureMessage(): string {
        return "Failed to register a service.";
    }

    public async run(): Promise<void> {
        try {
            await this.runSteps();
        } catch (error) {
            if (error instanceof OperationCanceledError) {
                theia.window.showErrorMessage(error.message);
            } else {
                theia.window.showErrorMessage(`${this.failureMessage} Error: ${error.message}`);
            }
            throw error;
        }
    }

    private async runSteps(): Promise<void> {

        let step: IStep | undefined = SpecifyServiceIdStep.getInstance();

        while (step !== undefined) {
            step = await step.execute(this.metadata);
        }
        try {
            await this.sendServiceData(this.serviceRegistryUrl, this.metadata);
        } catch (error) {
            if (error instanceof OperationCanceledError) {
                theia.window.showErrorMessage(error.message);
            } else {
                theia.window.showErrorMessage(`${this.failureMessage} Error: ${error.message}`);
            }
            throw error;
        }
        theia.commands.executeCommand("serviceregistry.explorer.refresh");
        theia.window.showInformationMessage("Service succesfully registered!");
    }

    private async sendServiceData(targetUrl: string, serviceMetadata: IServiceData): Promise<void> {
        await theia.window.withProgress({
            location: theia.ProgressLocation.Notification,
            title: "Registering service...",
            cancellable: false
        }, () => {
            // const p = new Promise((resolve, reject) => {
            //     setTimeout(() => {
            //         postJson(targetUrl, serviceMetadata).then(() => resolve(), (error) => reject(error));
            //     }, 2000);
            // });
            // return p;
            return postJson(targetUrl, serviceMetadata);//.then(() => resolve(), (error) => reject(error));
        });
    }

}
