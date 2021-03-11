/*******************************************************************************
 * Copyright (C) 2021 KAIROS DS
 * 
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 * 
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/

import * as theia from '@theia/plugin';

import * as bent from 'bent';
import { IServiceData } from 'src/handler/IServiceData';

const fetchJson = bent('GET', {
    'Accept': 'application/json'
}, 'json', 200);

export class ServiceListModel {
    private serviceRegistryUrl: string;

    constructor() {
        this.serviceRegistryUrl = theia.workspace.getConfiguration("smartclide.testplugin").get<string>("defaultServiceUrl") || "http://localhost:8080/services";
    }

    public get roots(): Promise<IServiceData[]> {
        const result = fetchJson(this.serviceRegistryUrl).then(data => {
            const mydata = data["_embedded"]["services"];
            // console.info("***************************************************************************************************");
            // console.info(mydata);
            // console.info(data);
            return mydata;
        });

        return result as Promise<IServiceData[]>;
    }
}

export class FtpTreeDataProvider implements theia.TreeDataProvider<IServiceData> {

    private _onDidChangeTreeData: theia.EventEmitter<any> = new theia.EventEmitter<any>();
    readonly onDidChangeTreeData: theia.Event<any> = this._onDidChangeTreeData.event;

    constructor(private readonly model: ServiceListModel) { }

    public refresh(): any {
        this._onDidChangeTreeData.fire();
    }

    public getTreeItem(element: IServiceData): theia.TreeItem2 {
        return {
            label: element.serviceId,
            description: element.serviceDescription,
            tooltip: element.serviceUrl,
            collapsibleState: theia.TreeItemCollapsibleState.None
        };
    }

    public getChildren(element?: IServiceData): IServiceData[] | Promise<IServiceData[]> {
        // return element ? this.model.getChildren(element) : this.model.roots;
        return element ? [] : this.model.roots;
    }

    public getParent(element: IServiceData): theia.ProviderResult<IServiceData> {
        return undefined;
    }

}

const serviceExplorerRefresh: theia.CommandDescription = {
    id: 'serviceregistry.explorer.refresh',
    label: 'Service Registry: Refresh service list'
};


export class ServiceExplorer {

    constructor(context: theia.PluginContext) {
        const serviceListModel = new ServiceListModel();
        const treeDataProvider = new FtpTreeDataProvider(serviceListModel);

        theia.window.createTreeView('serviceExplorer', { treeDataProvider });

        context.subscriptions.push(
            theia.commands.registerCommand(serviceExplorerRefresh, () => treeDataProvider.refresh()));
    }
}