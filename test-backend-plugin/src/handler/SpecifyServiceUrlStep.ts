/*******************************************************************************
 * Copyright (C) 2021 KAIROS DS
 * 
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 * 
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/

 import { workspace } from "@theia/plugin"
import { IServiceData } from "./IServiceData";
import { IStep } from "./IStep";
import { createInputBox, IInputMetaData } from "./utils";

export class SpecifyServiceUrlStep implements IStep {

    public static getInstance(): SpecifyServiceUrlStep {
        return SpecifyServiceUrlStep.SpecifyServiceUrlStep;
    }

    private static SpecifyServiceUrlStep: SpecifyServiceUrlStep = new SpecifyServiceUrlStep();

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
        this.defaultInput = workspace.getConfiguration("smartclide.testplugin").get<string>("defaultServiceUrl") || "";
    }

    public getNextStep(): IStep | undefined {
        return undefined;
    }

    public async execute(serviceData: IServiceData): Promise<IStep | undefined> {
        await this.specifyServiceUrl(serviceData);
        return this.getNextStep();
    }

    private async specifyServiceUrl(serviceData: IServiceData): Promise<boolean> {
        const inputMetaData: IInputMetaData = {
            metadata: serviceData,
            title: "Register service: Input the URL address of the service",
            placeholder: "e.g. https://mydomain.com/myservice",
            prompt: "Input the URL address of the service.",
            defaultValue: "https://mydomain.com/myservice",//SpecifyServiceUrlStep.getInstance().defaultInput,
            stepCancelledMsg: "No service URL provided",
            validate(inputValue: string) {
                console.info("validating " + inputValue);
                var expression = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
                let result = (!inputValue || !expression.test(inputValue)) ? "Invalid service URL" : null;
                console.info("result: " + result);
                return result;
            },
            assignValue(inputValue: string) {
                this.metadata.serviceUrl = inputValue;
            }
        };
        return await createInputBox(inputMetaData);
    }

}
