// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { IServiceData } from "./IServiceData";
import { IStep } from "./IStep";

export class DummyEndStep implements IStep {

    public static getInstance(): DummyEndStep {
        return DummyEndStep.DummyEndStep;
    }

    private static DummyEndStep: DummyEndStep = new DummyEndStep();

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
        this.defaultInput = "";
    }

    public getNextStep(): IStep | undefined {
        return undefined;
    }

    public async execute(serviceData: IServiceData): Promise<IStep | undefined> {
        return this.getNextStep();
    }


}
