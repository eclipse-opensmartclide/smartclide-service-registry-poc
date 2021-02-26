// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

// import * as theia from "@theia/plugin";
// import { Disposable, InputBox, QuickInputButtons, QuickPick, QuickPickItem, window } from "@theia/plugin";
import { Disposable, InputBox, window } from "@theia/plugin";
import { OperationCanceledError } from "../Errors";
//import { artifactIdValidation, groupIdValidation } from "../Utils";
//import { IProjectMetadata } from "./IProjectMetadata";
// import { IStep } from "./IStep";
//import { SpecifyArtifactIdStep } from "./SpecifyArtifactIdStep";
//import { SpecifyGroupIdStep } from "./SpecifyGroupIdStep";
//import { SpecifyJavaVersionStep } from "./SpecifyJavaVersionStep";
//import { SpecifyLanguageStep } from "./SpecifyLanguageStep";
//import { SpecifyPackagingStep } from "./SpecifyPackagingStep";
//import { SpecifyServiceUrlStep } from "./SpecifyServiceUrlStep";
import { IServiceData } from "./IServiceData";

// const DEFAULT_SERVICE_URL: string = "https://start.spring.io/";

// export async function specifyServiceUrl(projectMetadata?: IServiceData): Promise<string> {
//     const configValue = theia.workspace.getConfiguration("spring.initializr").get<string | string[]>("serviceUrl");
//     if (typeof configValue === "string") {
//         return configValue;
//     } else if (typeof configValue === "object" && configValue instanceof Array && configValue.length > 0) {
//         if (configValue.length === 1) {
//             return configValue[0];
//         }
//         if (projectMetadata !== undefined) {
//             projectMetadata.pickSteps.push(SpecifyServiceUrlStep.getInstance());
//         }
//         return await theia.window.showQuickPick(configValue, { ignoreFocusOut: true, placeHolder: "Select the service URL." });
//     } else {
//         return DEFAULT_SERVICE_URL;
//     }
// }

// export async function createPickBox(pickMetadata: IPickMetadata): Promise<boolean> {
//     const disposables: Disposable[] = [];
//     const result: boolean = await new Promise<boolean>((resolve, reject) => {
//         const pickBox: QuickPick<QuickPickItem> = window.createQuickPick<QuickPickItem>();
//         pickBox.title = pickMetadata.title;
//         pickBox.placeholder = pickMetadata.placeholder;
//         pickBox.items = pickMetadata.items;
//         pickBox.ignoreFocusOut = true;
//         if (pickMetadata.metadata.pickSteps.length > 0) {
//             pickBox.buttons = [(QuickInputButtons.Back)];
//             disposables.push(
//                 pickBox.onDidTriggerButton((item) => {
//                     if (item === QuickInputButtons.Back) {
//                         return resolve(false);
//                     }
//                 })
//             );
//         }
//         disposables.push(
//             pickBox.onDidAccept(() => {
//                 if (!pickBox.selectedItems[0]) {
//                     return;
//                 }
//                 if (pickMetadata.pickStep instanceof SpecifyLanguageStep) {
//                     pickMetadata.metadata.language = pickBox.selectedItems[0].label && pickBox.selectedItems[0].label.toLowerCase();
//                 } else if (pickMetadata.pickStep instanceof SpecifyJavaVersionStep) {
//                     pickMetadata.metadata.javaVersion = pickBox.selectedItems[0].label;
//                 } else if (pickMetadata.pickStep instanceof SpecifyPackagingStep) {
//                     pickMetadata.metadata.packaging = pickBox.selectedItems[0].label && pickBox.selectedItems[0].label.toLowerCase();
//                 }
//                 pickMetadata.metadata.pickSteps.push(pickMetadata.pickStep);
//                 return resolve(true);
//             }),
//             pickBox.onDidHide(() => {
//                 if (pickMetadata.pickStep instanceof SpecifyLanguageStep) {
//                     return reject(new OperationCanceledError("Language not specified."));
//                 } else if (pickMetadata.pickStep instanceof SpecifyJavaVersionStep) {
//                     return reject(new OperationCanceledError("Java version not specified."));
//                 } else if (pickMetadata.pickStep instanceof SpecifyPackagingStep) {
//                     return reject(new OperationCanceledError("Packaging not specified."));
//                 }
//                 return reject(new Error("Unknown picking step"));
//             })
//         );
//         disposables.push(pickBox);
//         pickBox.show();
//     });
//     for (const d of disposables) {
//         d.dispose();
//     }
//     return result;
// }

export async function createInputBox(inputMetaData: IInputMetaData): Promise<boolean> {
    const disposables: Disposable[] = [];
    const result: boolean = await new Promise<boolean>((resolve, reject) => {
        const inputBox: InputBox = window.createInputBox();
        inputBox.title = inputMetaData.title;
        inputBox.placeholder = inputMetaData.placeholder;
        inputBox.prompt = inputMetaData.prompt;
        inputBox.value = inputMetaData.defaultValue;
        inputBox.ignoreFocusOut = true;

        // if (inputMetaData.metadata.pickSteps.length > 0) {
        //     inputBox.buttons = [(QuickInputButtons.Back)];
        //     disposables.push(
        //         inputBox.onDidTriggerButton((item) => {
        //             if (item === QuickInputButtons.Back) {
        //                 return resolve(false);
        //             }
        //         })
        //     );
        // }
        disposables.push(
            inputBox.onDidChangeValue((value) => {
                let validCheck: string | null;
                // if (inputMetaData.pickStep instanceof SpecifyGroupIdStep) {
                //     validCheck = groupIdValidation(inputBox.value);
                // } else if (inputMetaData.pickStep instanceof SpecifyArtifactIdStep) {
                //     validCheck = artifactIdValidation(inputBox.value);
                // }
                validCheck = inputMetaData.validate(value);
                // window.showInformationMessage(validCheck || "ON CHANGE: VALID!");
                if (validCheck !== null) {
                    //inputBox.enabled = false;
                    inputBox.validationMessage = validCheck;
                } else {
                    //inputBox.enabled = true;
                    inputBox.validationMessage = undefined;
                }
                //  if(isBlank(inputBox.value)){
                //     inputBox.enabled = false;
                //     inputBox.validationMessage = "Please enter a value";
                // } else {
                //     inputBox.enabled = true;
                //     inputBox.validationMessage = undefined;
                // }
            }),
            inputBox.onDidAccept((e) => {
                e;
                // if (!inputBox.enabled) {
                //     return;
                // }
                // if (inputMetaData.pickStep instanceof SpecifyGroupIdStep) {
                //     inputMetaData.metadata.groupId = inputBox.value;
                //     SpecifyGroupIdStep.getInstance().setDefaultInput(inputBox.value);
                //     inputMetaData.metadata.pickSteps.push(SpecifyGroupIdStep.getInstance());
                // } else if (inputMetaData.pickStep instanceof SpecifyArtifactIdStep) {
                //     inputMetaData.metadata.artifactId = inputBox.value;
                //     SpecifyArtifactIdStep.getInstance().setDefaultInput(inputBox.value);
                //     inputMetaData.metadata.pickSteps.push(SpecifyArtifactIdStep.getInstance());
                // }
                // let validCheck: string | null;
                // validCheck = inputMetaData.validate(inputBox.value);
                // window.showInformationMessage(validCheck || "ON ACCEPT: VALID!");
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
                // if (inputMetaData.pickStep instanceof SpecifyGroupIdStep) {
                //     return reject(new OperationCanceledError("GroupId not specified."));
                // } else if (inputMetaData.pickStep instanceof SpecifyArtifactIdStep) {
                //     return reject(new OperationCanceledError("ArtifactId not specified."));
                // }
                // window.showInformationMessage("ON HIDE?!");

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

// export interface IPickMetadata {
//     metadata: IServiceData;
//     title: string;
//     pickStep: IStep;
//     placeholder: string;
//     items: QuickPickItem[];
// }

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
