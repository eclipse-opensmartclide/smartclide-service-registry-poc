import { workspace } from "@theia/plugin";
import { IStep } from "./IStep";
import { SpecifyServiceDescriptionStep } from "./SpecifyServiceDescriptionStep";
import { createInputBox, IInputMetaData } from "./utils";
import { IServiceData } from "./IServiceData";

export class SpecifyServiceIdStep implements IStep {

    public static getInstance(): SpecifyServiceIdStep {
        return SpecifyServiceIdStep.SpecifyServiceIdStep;
    }

    private static SpecifyServiceIdStep: SpecifyServiceIdStep = new SpecifyServiceIdStep();

    private defaultInput = "";

    constructor() {
        this.resetDefaultInput();
    }

    public getDefaultInput(): string {
        return this.defaultInput;
    }

    public setDefaultInput(defaultInput: string): void {
        this.defaultInput = defaultInput;
    }

    public resetDefaultInput(): void {
        this.defaultInput = workspace.getConfiguration("smartclide.testplugin").get<string>("defaultServiceName") || "";
    }

    public getNextStep(): IStep | undefined {
        return SpecifyServiceDescriptionStep.getInstance();
    }

    public async execute(projectMetadata: IServiceData): Promise<IStep | undefined> {
        await this.specifyServiceId(projectMetadata);
        return this.getNextStep();
    }

    private async specifyServiceId(projectMetadata: IServiceData): Promise<boolean> {
        const inputMetaData: IInputMetaData = {
            metadata: projectMetadata,
            title: "Register service: Input a name or ID for the service",
            placeholder: "e.g. demoService",
            prompt: "Input a name or ID for the service.",
            // defaultValue: SpecifyServiceIdStep.getInstance().defaultInput,
            defaultValue: "My Service",
            stepCancelledMsg: "No service ID entered",
            validate(inputValue: string) {
                console.info("validating " + inputValue);
                let result = (!inputValue || /^\s*$/.test(inputValue)) ? "Please enter a value" : null;
                console.info("result: " + result);
                return result;
            },
            assignValue(inputValue: string) {
                this.metadata.serviceId = inputValue;
            }
        };
        return await createInputBox(inputMetaData);

        // const result = await window.showInputBox({
        //     value: SpecifyServiceIdStep.getInstance().defaultInput,
        //     //valueSelection: [2, 4],
        //     ignoreFocusOut: true,
        //     placeHolder: 'e.g. demoService',
        //     validateInput: text => {
        //         return this.validateInput(text);
        //      },
        // });
        // if(this.validateInput(result)!==null){
        //     return false;
        // }
        // projectMetadata.serviceId = result;
        // window.showInformationMessage(`Got: ${result}`);
        // return true;
    }

    // private validateInput(text: string): string {
    //     window.showInformationMessage(`Validating: ${text}`);
    //     return (!text || /^\s*$/.test(text)) ? "Please enter a value" : null;
    // }
}
