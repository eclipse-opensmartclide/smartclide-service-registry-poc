# test-backend-plugin
test-backend-plugin Plugin example for Theia.

The goal of this Proof of Concept (aka PoC) is to define a simple project to study the addition of a new module into Theia IDE, simulating the integration with SmartCLIDE Service Registry module.The Service Registry module has a close relation with the IDE in the architecture definition, so it is easy enough to simulate while providing enough functionality to be used as an example and base or reference for future developments.

This Poc is by no means intended to define or use a final version of the Service Registry or Service Discovery modules; it will include, and be based on, a rough definition of the model and of the Service Registry API, in order to test how to do a proper integration with the IDE, and how the user interaction works. 

The idea is to investigate and see the capabilities of Eclipse Theia for this kind of interactions, find out as early as possible any relevant issues that might come up as a result of using Theia, and serve as a basis for future development. Fancier, or more user-friendly approaches could have been taken, but we intended to use what the tool provides out-of-the-box.

This PoC is composed by two parts:
- a separate Java/Spring project simulating the Service Registry itself.
- this theia plugin: provides UI for seeing existing services, as well as adding new ones. It provides a basic list shown in a dedicated panel, and a wizard for registering new services, which is invoked via command palette.

## commands:

The contributed commands by this plugin are the following:
- Service Registry: Refresh service list -> will refresh the list of services from the Service Registry
- Service Registry: Register a new service -> will launch the creation wizard

## Points of Interest

- the simulated service registry address is by default pointing to localhost:8080. It can be modified in the package.json file
- within the package.json file we defined the view container and details for the service list panel. Other things like commands or special actions can also be declaratively created here. Refer to the Theia examples to know more. We decided to register them in code just as an example.
- slight modifications were done to the tsconfig.json file in order to relax the criticity of the errors returned by the compiler; it is 100% strict by default.

## how to run this

- Download and install Theia (see the official documentation at https://github.com/eclipse-theia/theia/blob/master/doc/Developing.md)
- Create a workspace and checkout this project within it
- Launch Theia for browser (the electron part seems to have issues for handling hosted instances)
- Open the command palette, and search for "Hosted plugin: Start instance" (see https://theia-ide.org/docs/authoring_plugins)
- Select the folder where this project was checked out to
- The hosted instance will be opened into a new tab with this plugin already loaded. You should see the panel for the list of existing services on the right, and be able to find the commands by searching for "Service Registry" in the palette

*NOTE* that the accompanying SpringBoot app must be running for the plugin to work properly
