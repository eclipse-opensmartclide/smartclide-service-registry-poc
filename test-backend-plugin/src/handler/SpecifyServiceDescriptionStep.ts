// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { workspace } from "@theia/plugin";
import { IStep } from "./IStep";
import { SpecifyServiceUrlStep } from "./SpecifyServiceUrlStep";
import { createInputBox, IInputMetaData } from "./utils";
import { IServiceData } from "./IServiceData";

export class SpecifyServiceDescriptionStep implements IStep {

    public static getInstance(): SpecifyServiceDescriptionStep {
        return SpecifyServiceDescriptionStep.SpecifyServiceDescriptionStep;
    }

    private static SpecifyServiceDescriptionStep: SpecifyServiceDescriptionStep = new SpecifyServiceDescriptionStep();

    private defaultInput: string = "";

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
        this.defaultInput = workspace.getConfiguration("smartclide.testplugin").get<string>("defaultServiceDescription") || "";
    }

    public getNextStep(): IStep | undefined {
        return SpecifyServiceUrlStep.getInstance();
    }

    public async execute(projectMetadata: IServiceData): Promise<IStep | undefined> {
        await this.specifyServiceDescription(projectMetadata);
        return this.getNextStep();
    }

    private async specifyServiceDescription(projectMetadata: IServiceData): Promise<boolean> {
        const inputMetaData: IInputMetaData = {
            metadata: projectMetadata,
            title: "Register service: (Optional) Input a short description of the service",
            placeholder: "e.g. Demonstration service",
            prompt: "Input a short description of the service.",
            defaultValue: "Demo service",//SpecifyServiceDescriptionStep.getInstance().defaultInput,
            validate(inputValue: string) {
                return null;//accept all since it's an optional step
            },
            assignValue(inputValue: string) {
                this.metadata.serviceDescription = inputValue;
            }
        };
        return await createInputBox(inputMetaData);
    }
}
