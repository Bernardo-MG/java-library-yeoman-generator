package <%= package %>.test.integration;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Test;

import <%= package %>.MainClass;

class MainClassIT {

    @Test
    void integrationSuiteIsConfigured() {
        assertNotNull(MainClass.projectName());
    }
}
