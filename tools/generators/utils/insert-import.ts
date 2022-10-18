import {Tree} from "@nrwl/devkit";
import {createSourceFile, ScriptTarget} from "typescript";
import {insertImport as nxInsertImport} from "@nrwl/workspace/src/utilities/ast-utils";

export function insertImport(tree: Tree, filePath: string, symbolName: string, fileName: string) {
  const moduleSrc = tree.read(filePath, 'utf-8');
  const sourceFile = createSourceFile(filePath, moduleSrc, ScriptTarget.Latest, true);
  nxInsertImport(tree, sourceFile, filePath, symbolName, fileName);
}
