package org.smartclide.demo.repositories;

import org.smartclide.demo.model.ServiceDescriptor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "services", path = "services")
public interface ServiceDescriptorRepository extends CrudRepository<ServiceDescriptor, Long> {
    
}
