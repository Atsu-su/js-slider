#!/usr/local/bin/bash

git remote add common-components git@github.com:Atsu-su/components.git
git subtree add --prefix=components --squash common-components main