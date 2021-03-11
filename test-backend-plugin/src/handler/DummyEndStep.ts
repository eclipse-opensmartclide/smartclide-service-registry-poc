/*******************************************************************************
 * Copyright (C) 2021 KAIROS DS
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/

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
