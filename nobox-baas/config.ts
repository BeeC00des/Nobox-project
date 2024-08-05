import  {  Config,  getFunctions,  getSchemaCreator  }  from  "nobox-client";

export const config: Config = {
endpoint:  "https://api.nobox.cloud",
project:  "Nobox form",
token: "aa5g2d7sfobbmbzm3m9iz2m-8abu-ubf8am5mb97",
};

export const createRowSchema = getSchemaCreator(config, { type: "rowed" });

export const createKeyGroupSchema = getSchemaCreator(config, { type: "key-group" });

export  const  Nobox  =  getFunctions(config);