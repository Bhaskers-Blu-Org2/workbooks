//
// Author:
//   Aaron Bockover <abock@microsoft.com>
//
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { CodeCellResult, CodeCellResultHandling, CodeCellEventType } from '../evaluation'
import { ResultRendererRegistry } from '../ResultRendererRegistry'
import { MockedCodeCellView } from './CodeCellView';

export class ComponentPlayground extends React.Component<RouteComponentProps<{}>> {
    private readonly nullResult: CodeCellResult = {
        $type: CodeCellEventType.Evaluation,
        codeCellId: '85cd037b-4cb6-4489-a854-912959b60a6b/3fb9e8a3-2c29-429d-b417-e2678761b57e',
        isNullResult: false,
        evaluationDuration: '',
        cultureLCID: 1033,
        uiCultureLCID: 1033,
        resultHandling: CodeCellResultHandling.Replace,
        resultType: null,
        resultRepresentations: []
    }

    private readonly numberResult: CodeCellResult = {
        $type: CodeCellEventType.Evaluation,
        codeCellId: '65a6fd4c-696f-4b2f-9d0d-3bf452e69f5f/eab2b254-9047-4670-bdb1-5e24aefa4843',
        isNullResult: false,
        evaluationDuration: '',
        cultureLCID: 1033,
        uiCultureLCID: 1033,
        resultHandling: CodeCellResultHandling.Replace,
        resultType: 'System.Double',
        resultRepresentations: [
            25000000000.32,
            {
                $type: 'System.Double',
                $toString: [
                    {
                        culture: {
                            name: 'en-US',
                            lcid: 1033
                        },
                        formats: [
                            { '{value}': '25000000000.32' },
                            { '{value:N}': '25,000,000,000.32' },
                            { '{value:C}': '$25,000,000,000.32' }
                        ]
                    },
                    {
                        culture: {
                            name: '',
                            lcid: 127
                        },
                        formats: [
                            { '{value}': '25000000000.32' },
                            { '{value:N}': '25,000,000,000.32' },
                            { '{value:C}': '¤25,000,000,000.32' }
                        ]
                    }
                ]
            }
        ]
    }

    private readonly dateTimeResult: CodeCellResult = {
        $type: CodeCellEventType.Evaluation,
        codeCellId: 'dca76582-6c22-4c64-9893-2270a67552ce/e9234d19-89a4-4e43-a7cd-780f3fd04541',
        isNullResult: false,
        evaluationDuration: '',
        cultureLCID: 1033,
        uiCultureLCID: 1033,
        resultHandling: CodeCellResultHandling.Replace,
        resultType: 'System.DateTime',
        resultRepresentations: [
            '2018-03-03T23:22:00.102405',
            {
                $type: 'System.DateTime',
                $toString: '03/03/2018 23:22:00'
            }
        ]
    }

    public render() {
        return (
            <article style={{ margin: '1em 2em' }}>
                <h2>Code Cell</h2>
                <MockedCodeCellView
                    rendererRegistry={ResultRendererRegistry.createDefault()}
                    results={[]} />

                <h2>Code Cell with Number Result</h2>
                <MockedCodeCellView
                    rendererRegistry={ResultRendererRegistry.createDefault()}
                    results={[this.numberResult]} />

                <h2>Code Cell with DateTime Result</h2>
                <MockedCodeCellView
                    rendererRegistry={ResultRendererRegistry.createForDesign()}
                    results={[this.dateTimeResult]}/>

                <h2>Code Cell with Multiple Results</h2>
                <MockedCodeCellView
                    rendererRegistry={ResultRendererRegistry.createForDesign()}
                    results={[this.nullResult, this.nullResult]}
                    resultHandling={CodeCellResultHandling.Append}/>
            </article>
        )
    }
}