/*******************************************************************************
 * Copyright (C) 2021 KAIROS DS
 * 
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 * 
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/

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
