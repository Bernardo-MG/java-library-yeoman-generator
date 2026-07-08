package <%= package %>;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Test;

class <%= mainClass %>IT {

    @Test
    void integrationSuiteIsConfigured() {
        assertNotNull(<%= mainClass %>.projectName());
    }
}
