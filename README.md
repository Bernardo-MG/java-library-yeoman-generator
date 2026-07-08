# Java Library Yeoman Generator

A working Yeoman generator for Maven-based Java library projects, for generating new Maven-based libraries, fully prepared to take advantage of a CI process.

While it can be prepared for any CI service, it is prepared for [Github Workflow][github-workflow]. Acquiring the code from a [Github][github] repository and publishing into [OSS Sonatype][sonatype] or [Github packages][github-packages].

After running all the tests artifacts will be published into this repository, but the new project will be able to generate and publish also a Maven site, which, thanks to the [Docs Maven Skin][docs-skin], will show documentation and useful reports from Checkstyle, SpotBugs and similar tools.

The Archetype will do little more than take care of configuration, setting up the POM and the Maven project is most of its job, and so it will include few files not related to this. Some useful things such as a readme, a gitignore and a license files are included, but the initial code will consists just of a few placeholder classes.

## Features

- Fully configured POM, extending from [bernardomg's Base POM][base-pom], including features such as build validation, changes report or manifest configuration.
- Prepared for continuous integration with [Github][github], [Github Workflow][github-workflow] and both [OSS Sonatype][sonatype] and [Github packages][github-packages]. Making a distinction between releases and development versions.
- Prepared for unit and integration tests suites. Created with [JUnit][junit] and ready to be run with [Surefire][surefire] and [Failsafe][failsafe].
- A Maven site, using the [Docs Maven Skin][docs-skin], for sharing the project's documentation along the Javadocs and various reports which range from code quality to changes log.
- Includes basic files such as readme, gitignore and license.

## Usage

First of all install the dependencies and link the project:

```bash
npm install
npm link
```

Now, go to the folder where you want to create the new project, and run:

```bash
mkdir my-library
cd my-library
yo library-maven
mvn verify
```

### Changing JDK Version

By default the project will be set for JDK 11. If this needs to be changed, for example to make use of JDK 17, the java.version property has to be overriden:

```xml
<properties>
   <java.version>17</java.version>
<\properties>
```

[junit]: https://junit.org

[docs-skin]: https://github.com/Bernardo-MG/docs-maven-skin
[base-pom]: https://github.com/Bernardo-MG/base-pom

[github]: https://github.com/
[sonatype]: https://oss.sonatype.org/
[github-packages]: https://github.com/features/packages
[github-workflow]: https://docs.github.com/en/actions/configuring-and-managing-workflows

[surefire]: https://maven.apache.org/surefire/maven-surefire-plugin/
[failsafe]: https://maven.apache.org/surefire/maven-failsafe-plugin/
