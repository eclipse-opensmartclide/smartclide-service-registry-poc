/*******************************************************************************
 * Copyright (C) 2021 KAIROS DS
 * 
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 * 
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/
package org.smartclide.demo.repositories;

import org.smartclide.demo.model.ServiceDescriptor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "services", path = "services")
public interface ServiceDescriptorRepository extends CrudRepository<ServiceDescriptor, Long> {
    
}
