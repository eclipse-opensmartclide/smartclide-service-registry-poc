
/**
 * Generated using theia-plugin-generator
 */

import * as theia from '@theia/plugin';
import { RegisterServiceHandler } from './handler/RegisterServiceHandler';
import { ServiceExplorer } from './view/serviceExplorer';

export function start(context: theia.PluginContext) {

    registerCommand(context, {
        id: 'serviceregistry.register_service',
        label: 'Service Registry: Register a new service in SmartCLIDE service registry',
        callback: async () => {
            await new RegisterServiceHandler().run();
        }
    });

    new ServiceExplorer(context);
}

function registerCommand(context: theia.PluginContext, command: { id: string, label: string, callback: (...args: any[]) => any }): void {
    context.subscriptions.push(
        theia.commands.registerCommand({
            id: command.id,
            label: command.label
        }, command.callback)
    );
}

export function stop() {

}
