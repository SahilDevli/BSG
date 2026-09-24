# Design To Dev
These scripts automate the component and page creation from figma and to production ready code and than rase a PR(pull request) in GitHub.

## There are 3 way to trigger this script.
1. For Design Token :       npm run designToken.
2. For Component Creation:  npm run componentPipeline
3. For Page Creation:       npm run pagePipeline

## Cycles

    1. Figma Design Token ->   Design Token pipeline  ->  CSS variables       ->   PR
    2. Figma Components   ->   Component pipeline     ->  Code(tsx,scss,etc)  ->   PR
    3. Figma Page         ->   Page pipeline          ->  Code(tsx,mdx,etc)   ->   PR



## Output
1. 6 fix file [ tsx, scss, test, md, mdx, story ]
2. Drift Report [ html doc ]
3. Vesion files [ maintain version and maping ]
