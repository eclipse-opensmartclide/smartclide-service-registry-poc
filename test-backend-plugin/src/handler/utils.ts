/*******************************************************************************
 * Copyright (C) 2021 KAIROS DS
 * 
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 * 
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/

import { Disposable, InputBox, window } from "@theia/plugin";
import { OperationCanceledError } from "../Errors";
import { IServiceData } from "./IServiceData";

export async function createInputBox(inputMetaData: IInputMetaData): Promise<boolean> {
    const disposables: Disposable[] = [];
    const result: boolean = await new Promise<boolean>((resolve, reject) => {
        const inputBox: InputBox = window.createInputBox();
        inputBox.title = inputMetaData.title;
        inputBox.placeholder = inputMetaData.placeholder;
        inputBox.prompt = inputMetaData.prompt;
        inputBox.value = inputMetaData.defaultValue;
        inputBox.ignoreFocusOut = true;

        disposables.push(
            inputBox.onDidChangeValue((value) => {
                let validCheck: string | null;
                validCheck = inputMetaData.validate(value);
                if (validCheck !== null) {
                    inputBox.validationMessage = validCheck;
                } else {
                    inputBox.validationMessage = undefined;
                }
            }),
            inputBox.onDidAccept(() => {
                if (inputBox.validationMessage === undefined) {
                    inputMetaData.assignValue(inputBox.value);
                    return resolve(true);
                }
                if (inputMetaData.stepCancelledMsg !== null) {
                    return reject(new OperationCanceledError(inputMetaData.stepCancelledMsg));
                }
                return reject(new OperationCanceledError("Invalid input"));
            }),
            inputBox.onDidHide(() => {
                if (inputMetaData.stepCancelledMsg !== null) {
                    return reject(new OperationCanceledError(inputMetaData.stepCancelledMsg));
                }
                return reject(new OperationCanceledError("Invalid input"));
            })
        );
        disposables.push(inputBox);
        inputBox.show();
    });
    for (const d of disposables) {
        d.dispose();
    }
    return result;
}

export interface IInputMetaData {
    metadata: IServiceData;
    title: string;
    placeholder: string;
    prompt: string;
    defaultValue: string;
    stepCancelledMsg?: string;
    validate(inputFieldValue: string): string | null;
    assignValue(inputFieldValue: string): void;
}
