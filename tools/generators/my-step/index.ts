import {applyChangesToString, ChangeType, joinPathFragments, readProjectConfiguration, Tree} from '@nrwl/devkit';
import {wrapAngularDevkitSchematic} from "nx/src/adapter/ngcli-adapter";
import {classify, dasherize} from "@nrwl/workspace/src/utils/strings";
import {createSourceFile, Identifier, isIdentifier, isVariableStatement, ScriptTarget} from "typescript";

interface Schema {
  name: string;
  project: string;
}

export default async function (tree: Tree, schema: Schema) {
  const moduleSchematic = wrapAngularDevkitSchematic('@schematics/angular', 'module');
  await moduleSchematic(tree, {
    name: dasherize(schema.name),
    project: schema.project
  });

  const projectDir = readProjectConfiguration(tree, schema.project).root;
  const configFileName = joinPathFragments(projectDir, 'src', 'app', 'app.config.ts');
  const fileContents = tree.read(configFileName).toString('utf-8');
  const sourceFile = createSourceFile(configFileName, fileContents, ScriptTarget.Latest);

  const stepsDeclaration = sourceFile.statements
    .filter(isVariableStatement)
    .map(s => s.declarationList.declarations[0])
    .filter(d => isIdentifier(d.name))
    .find(d => (d.name as Identifier).escapedText === 'loginSteps');

  const stepToAdd = `"${classify(schema.name)}",`;
  const newContents = applyChangesToString(fileContents, [{
    type: ChangeType.Insert,
    index: stepsDeclaration.end - 1,
    text: stepToAdd
  }]);
  tree.write(configFileName, newContents);
}
