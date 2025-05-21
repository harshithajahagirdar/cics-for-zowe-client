/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright Contributors to the Zowe Project.
 *
 */

import { ExtensionContext, TreeView, Uri, commands, window } from "vscode";
import { ResourceInspectorViewProvider } from "../trees/ResourceInspectorViewProvider";
import { CICSResourceContainerNode } from "../trees";
import { ILocalFile, IProgram, IResource } from "../doc";
import { findSelectedNodes } from "../utils/commandUtils";

export function getResourceInspectorCommand(context: ExtensionContext, treeview: TreeView<any>) {
  return commands.registerCommand("cics-extension-for-zowe.inspectResource", async (node: CICSResourceContainerNode<IResource>) => {
    const nodes = findSelectedNodes(treeview, node.getContainedResource().meta, node);
    if (!nodes || !nodes.length) {
      await window.showErrorMessage("No CICS resource selected");
      return;
    }
    getResourceViewProvider(nodes, context.extensionUri, treeview);
  });
}

function getResourceViewProvider(
  selectedNodes: CICSResourceContainerNode<IResource>[],
  extensionUri: Uri,
  treeview: TreeView<any>) {
  for (const item of selectedNodes) {
    const resource = item.getContainedResource().resource.attributes;

    const data = {
      label: `${item.label}`,
      attributes: resource,
      details: {}
    };

    if (item.getContainedResource().meta.resourceName === "CICSProgram") {
      data.details = {
        status: "(Program File; " + (resource as IProgram).status + ")",
        type: (resource as IProgram).progtype,
        permission: (resource as IProgram).sharestatus,
        keyLength: (resource as IProgram).length,
        recordSize: (resource as IProgram).changeagrel,
        dsName: (resource as IProgram).eyu_cicsname,
      };
    } else if (item.getContainedResource().meta.resourceName === "CICSLocalFile") {
      data.details = {
        status: "(Local File; " + ((resource as ILocalFile).openstatus + " and " + (resource as ILocalFile).enablestatus).toLowerCase() + ")",
        Type: (resource as ILocalFile).vsamtype,
        Permission: (resource as ILocalFile).read + " , " + (resource as ILocalFile).browse,
        Keylength: (resource as ILocalFile).keylength,
        "Record Size": (resource as ILocalFile).recordsize,
        "DS Name": (resource as ILocalFile).dsname,
      };
    }

    const resourceViewProvider = ResourceInspectorViewProvider.getInstance(extensionUri, treeview);
    const enbededWebview = resourceViewProvider?._manager?._view;
    resourceViewProvider.reloadData(data, enbededWebview);
  }
  commands.executeCommand("setContext", "zowe.vscode-extension-for-zowe.showResourceInspector", true);
  commands.executeCommand("workbench.view.extension.inspector-panel");
}
