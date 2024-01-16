# Product Api

Will get information about the products that is stored in the database. 

The user can use the api with tow end points:

*  https://cscloud8-18.lnu.se/spar-handla/api/v1/product/
*  https://cscloud8-18.lnu.se/spar-handla/api/v1/code/



## The first end point
*  https://cscloud8-18.lnu.se/spar-handla/api/v1/

GET
/product/{name}
Get all the products that its name contains the given string.  

### Responses  

200  returns a list of all the products that contains the given string.

example value , schema 

[
    {
        "id": "626d91e67f877ed0d8ae060d",
        "sameCode": 76145513,
        "imageUrl": "https://assets.icanet.se/t_product_medium_v1,f_auto/76145513.jpg",
        "name": "Toblerone 50g Marabou"
    },
    {
        "id": "626d91aa7f877ed0d8ae0397",
        "sameCode": 7312930002201,
        "imageUrl": "https://assets.icanet.se/t_product_medium_v1,f_auto/7312930002201.jpg",
        "name": "Mandeltårta Toblerone Glutenfri Fryst 400g Almondy"
    },
    {
        "id": "626d923e7f877ed0d8ae09f1",
        "sameCode": 7614500010013,
        "imageUrl": "https://assets.icanet.se/t_product_medium_v1,f_auto/7614500010013.jpg",
        "name": "Original 100g Toblerone "
    }
]

404 The requested product was not found.


{
  "status_code": 404,
  "message": "The requested product was not found."
}


500	

An unexpected condition was encountered.

{
  "status_code": 500,
  "message": "An unexpected condition was encountered."
}




## The second end point
*  https://cscloud8-18.lnu.se/spar-handla/api/v1/

GET
/product/{name}
Get all the products that its name contains the given string.  

### Responses  

200  returns a specific product.

example value , schema 

{
    "stringValue": "\"626d608acd9b676d239dbc7c\"",
    "valueType": "string",
    "kind": "Number",
    "value": "626d608acd9b676d239dbc7c",
    "path": "sameCode",
    "reason": {
        "generatedMessage": true,
        "code": "ERR_ASSERTION",
        "actual": false,
        "expected": true,
        "operator": "=="
    },
    "name": "CastError",
    "message": "Cast to Number failed for value \"626d608acd9b676d239dbc7c\" (type string) at path \"sameCode\" for model \"Product\""
}

404 The requested product was not found.
if the user write fail code or leave empty

{
  "status_code": 404,
  "message": "The requested product was not found."
}


500	

An unexpected condition was encountered.

{
  "status_code": 500,
  "message": "An unexpected condition was encountered."
}



