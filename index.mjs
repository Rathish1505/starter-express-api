import fetch from 'node-fetch';

export const handler = async (event) => {
  // console.log("QUERY Params", JSON.stringify(event.queryStringParameters.RequestURL));
  // console.log("BODY", event.body);
  // console.log("EVENT", event);
  var resultData;
  const url = event.queryStringParameters.RequestURL;
  console.log("URL", url);

  var splitUrl = url.split('?');
  var basePart = splitUrl[0];
  var queryPart = splitUrl[1] || '';

  console.log("queryPart", queryPart);

  // Encode the query parameters
  var encodedQueryParams = encodeURIComponent(queryPart).replace(/%26/g, '&').replace(/%3D/g, '=');
  console.log("encodedQueryParams", encodedQueryParams);

  // Construct the final URL
  var requestURL = basePart + '?' + encodedQueryParams;
  console.log("requestURL", requestURL);

  // Make the AJAX call
  try {
    const response = await fetch(requestURL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/vnd.ms-excel',
      },
      body: event.body
    });

    if (response.ok) {
      // resultData = await response.text();
      resultData = 'success';
      console.log("Success Data", resultData);
    } else {
      resultData = response;
      throw new Error('Request failed with status:' + response.status);
    }
  } catch (error) {
    resultData = error;
    console.error("Error Data", error);
  }

  const lambdaResponse = {
    statusCode: 200,
    body: resultData,
  };
  return lambdaResponse;
};
