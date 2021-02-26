// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { IServiceData } from "./IServiceData";

export interface IStep {
    getNextStep(): IStep | undefined;
    execute(serviceData: IServiceData): Promise<IStep | undefined>;
}
