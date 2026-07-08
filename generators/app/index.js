import Generator from 'yeoman-generator';
import yosay from 'yosay';

const toPackagePath = (javaPackage) => javaPackage.replaceAll('.', '/');
const toClassName = (artifactId) => artifactId
  .split(/[^A-Za-z0-9]+/)
  .filter(Boolean)
  .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
  .join('') || 'Library';

export default class LibraryMavenGenerator extends Generator {
  async prompting() {
    this.log(yosay('Maven Java library generator'));

    this.answers = await this.prompt([
      {
        type: 'input',
        name: 'groupId',
        message: 'Maven groupId',
        default: 'com.example'
      },
      {
        type: 'input',
        name: 'artifactId',
        message: 'Maven artifactId',
        default: this.appname.replaceAll(' ', '-').toLowerCase()
      },
      {
        type: 'input',
        name: 'version',
        message: 'Initial version',
        default: '0.0.1-SNAPSHOT'
      },
      {
        type: 'input',
        name: 'package',
        message: 'Java package',
        default: (answers) => answers.groupId
      },
      {
        type: 'input',
        name: 'projectName',
        message: 'Project name',
        default: 'Basic Maven Project'
      },
      {
        type: 'input',
        name: 'projectDescription',
        message: 'Project description',
        default: 'A Maven project created from the maven library Yeoman generator.'
      },
      {
        type: 'input',
        name: 'currentYear',
        message: 'Inception/current year',
        default: String(new Date().getFullYear())
      },
      {
        type: 'input',
        name: 'developerId',
        message: 'Developer id',
        default: 'developer'
      },
      {
        type: 'input',
        name: 'developerName',
        message: 'Developer name',
        default: 'Developer'
      },
      {
        type: 'input',
        name: 'developerMail',
        message: 'Developer email',
        default: 'developer@example.com'
      },
      {
        type: 'input',
        name: 'developerUrl',
        message: 'Developer URL',
        default: 'https://github.com/example'
      },
      {
        type: 'input',
        name: 'repoUserId',
        message: 'GitHub user or organization',
        default: 'example'
      },
      {
        type: 'input',
        name: 'javaVersion',
        message: 'Java version',
        default: '11'
      }
    ]);
  }

  writing() {
    const context = {
      ...this.answers,
      packagePath: toPackagePath(this.answers.package),
      mainClass: toClassName(this.answers.artifactId)
    };

    this.fs.copyTpl(
      this.templatePath('**/*'),
      this.destinationPath(),
      context,
      {},
      { globOptions: { dot: true } }
    );

    this.fs.move(this.destinationPath('_gitignore'), this.destinationPath('.gitignore'));
    this.fs.move(this.destinationPath('_gitattributes'), this.destinationPath('.gitattributes'));
    this.fs.move(this.destinationPath('_github'), this.destinationPath('.github'));
    this.fs.move(this.destinationPath('_readme.md'), this.destinationPath('readme.md'));
    this.fs.move(this.destinationPath('_pom.xml'), this.destinationPath('pom.xml'));
  }

  end() {
    this.log('Project generated. Run: mvn verify');
  }
}
