#!/bin/sh

# Your API Key for OpenAI
openai_api_key=$OPENAI_API_KEY
# Provide proxy for OpenAI API. e.g. http://127.0.0.1:7890
https_proxy=$HTTPS_PROXY
# Custom base url for OpenAI API. default: https://api.openai.com
openai_api_base_url=$OPENAI_API_BASE_URL
# Inject analytics or other scripts before </head> of the page
head_scripts=$HEAD_SCRIPTS
# Secret string for the project. Use for generating signatures for API calls
public_secret_key=$PUBLIC_SECRET_KEY
# Set password for site, support multiple password separated by comma. If not set, site will be public
site_password=$SITE_PASSWORD
# ID of the model to use. https://platform.openai.com/docs/api-reference/models/list
openai_api_model=$OPENAI_API_MODEL

for file in $(find ./dist -type f -name "*.mjs"); do
  sed "s/({}).OPENAI_API_KEY/\"$openai_api_key\"/g;
  s/({}).HTTPS_PROXY/\"$https_proxy\"/g;
  s/({}).OPENAI_API_BASE_URL/\"$openai_api_base_url\"/g;
  s/({}).HEAD_SCRIPTS/\"$head_scripts\"/g;
  s/({}).PUBLIC_SECRET_KEY/\"$public_secret_key\"/g;
  s/({}).OPENAI_API_MODEL/\"$openai_api_model\"/g;
  s/process.env.SITE_PASSWORD/\"$site_password\"/g" $file > tmp
  mv tmp $file
done

rm -rf tmp
