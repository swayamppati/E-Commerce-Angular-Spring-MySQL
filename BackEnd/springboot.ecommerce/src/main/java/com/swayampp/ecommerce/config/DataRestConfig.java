package com.swayampp.ecommerce.config;

import com.swayampp.ecommerce.entity.State;
import com.swayampp.ecommerce.entity.Country;
import com.swayampp.ecommerce.entity.Product;
import com.swayampp.ecommerce.entity.ProductCategory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.metamodel.EntityType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.core.mapping.HttpMethods;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Configuration
public class DataRestConfig implements RepositoryRestConfigurer {

    private EntityManager entityManager;

    @Autowired
    public DataRestConfig(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        RepositoryRestConfigurer.super.configureRepositoryRestConfiguration(config, cors);

        HttpMethod[] disabledMethods = {HttpMethod.POST, HttpMethod.PUT, HttpMethod.DELETE};

        config.getExposureConfiguration()
                .forDomainType(Product.class)
                .withItemExposure((metdata, httpMethods) -> httpMethods.disable(disabledMethods))
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(disabledMethods));

        config.getExposureConfiguration()
                .forDomainType(ProductCategory.class)
                .withItemExposure((metdata, httpMethods) -> httpMethods.disable(disabledMethods))
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(disabledMethods));

        config.getExposureConfiguration()
                .forDomainType(Country.class)
                .withItemExposure((metdata, httpMethods) -> httpMethods.disable(disabledMethods))
                .withCollectionExposure((metadata, httpMethods) -> httpMethods.disable(disabledMethods));

        config.getExposureConfiguration()
                .forDomainType(State.class)
                .withItemExposure((metdata, httpMethods) -> httpMethods.disable(disabledMethods))
                .withCollectionExposure((metadata, httpMethods) -> httpMethods.disable(disabledMethods));

        //call an internal helper method to expose IDs for all Entities
        exposeIds(config);
    }

    private void exposeIds(RepositoryRestConfiguration config) {
        //expose entity ids.
        //config.exposeIdsFor(domainTypes) -> This is the method we need to reach
        //for which we need the Class[] array of Class of each Entity

        //Get Entity Set from entityManager
        Set<EntityType<?>> entitySet = entityManager.getMetamodel().getEntities();

        //Add the Class of each into an ArrayList
        List<Class> entityClassList = new ArrayList<>();
        for(EntityType entity: entitySet)
            entityClassList.add(entity.getJavaType());

        //Convert the ArrayList to Array
        Class[] entityClassArray = new Class[entityClassList.size()];
        entityClassArray = entityClassList.toArray(entityClassArray);

        //expose ids
        config.exposeIdsFor(entityClassArray);
    }
}
