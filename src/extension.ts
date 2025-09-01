import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext)
{
	context.subscriptions.push
	(
        vscode.languages.registerFoldingRangeProvider
		(
			'jira-markdown',
			{
            	provideFoldingRanges(document: vscode.TextDocument): vscode.FoldingRange[]
				{
                	const ranges: vscode.FoldingRange[] = [];

					const rangeData: { [key: string]: Array<[number, number]> } =
					{
						"{noformat[^}]*}": [],
						"{panel[^}]*}": [],
						"{code[^}]*}": [],
						"{quote}": []
					};

                	for (let lNum = 0; lNum < document.lineCount; lNum++)
					{
                    	const lineText = document.lineAt(lNum).text;

						for (const key in rangeData)
						{
							if (lineText.match(key))
							{
                            	const dataBlock = rangeData[key];
								if (dataBlock.length === 0 || dataBlock[dataBlock.length - 1][1] !== -1)
								{
									dataBlock.push([lNum, -1]);
								}
								else
								{
									dataBlock[dataBlock.length - 1][1] = lNum;
								}
                        	}
                    	}
					}

					for (const key in rangeData)
					{
						const oneBlockData = rangeData[key];
						for (const pair of oneBlockData)
						{
							ranges.push(new vscode.FoldingRange(pair[0], pair[1]));
						}
					}

    	            return ranges;
				}
            }
		)
    );
}

export function deactivate()
{
}
