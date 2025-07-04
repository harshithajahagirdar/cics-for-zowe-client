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

import { CicsCmciConstants } from "@zowe/cics-for-zowe-sdk";
import *  as ResourceTypes from "../doc/meta";

export const SupportedResources = {
    resources: [
      CicsCmciConstants.CICS_CMCI_LOCAL_FILE,
      CicsCmciConstants.CICS_PROGRAM_RESOURCE,
      CicsCmciConstants.CICS_CMCI_LOCAL_TRANSACTION,
      CicsCmciConstants.CICS_TCPIPSERVICE_RESOURCE,
      CicsCmciConstants.CICS_LIBRARY_RESOURCE,
      CicsCmciConstants.CICS_URIMAP,
      CicsCmciConstants.CICS_CMCI_TASK,
      CicsCmciConstants.CICS_CMCI_PIPELINE,
      CicsCmciConstants.CICS_CMCI_WEB_SERVICE,
    ],

    metaResources: [
      ResourceTypes.LocalFileMeta,
      ResourceTypes.ProgramMeta,
      ResourceTypes.TransactionMeta,
      ResourceTypes.TCPIPMeta,
      ResourceTypes.LibraryMeta,
      ResourceTypes.URIMapMeta,
      ResourceTypes.TaskMeta,
      ResourceTypes.PipelineMeta,
      ResourceTypes.WebServiceMeta
    ],

}
