// Example 1: Basic Promise.allSettled
const fetchWithPromiseAllSettled = async (urls) => {
  const startTime = Date.now();

  const promises = urls.map((url) =>
    fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then((data) => ({ status: "fulfilled", value: data }))
      .catch((error) => ({ status: "rejected", reason: error.message }))
  );

  const results = await Promise.allSettled(promises);
  const endTime = Date.now();

  console.log(`📊 Promise.allSettled completed in ${endTime - startTime}ms`);

  // Filter results
  const successful = results.filter((result) => result.status === "fulfilled");
  const failed = results.filter((result) => result.status === "rejected");

  console.log(
    `✅ Successful: ${successful.length}, ❌ Failed: ${failed.length}`
  );

  return {
    successful: successful.map((s) => s.value),
    failed: failed.map((f) => f.reason),
    allResults: results,
  };
};

// Example 2: Advanced with Retry Logic
const fetchWithRetryAndSettled = async (urls, maxRetries = 2) => {
  const fetchWithRetry = async (url, retriesLeft = maxRetries) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      if (retriesLeft > 0) {
        console.log(`Retrying ${url}, ${retriesLeft} retries left`);
        return fetchWithRetry(url, retriesLeft - 1);
      }
      throw error;
    }
  };

  const promises = urls.map((url) =>
    fetchWithRetry(url)
      .then((data) => ({ status: "fulfilled", value: data, url }))
      .catch((error) => ({ status: "rejected", reason: error.message, url }))
  );

  const results = await Promise.allSettled(promises);

  return results.map((result) => ({
    url: result.value?.url || result.reason?.url,
    status: result.status,
    data: result.status === "fulfilled" ? result.value.value : null,
    error: result.status === "rejected" ? result.value.reason : null,
  }));
};
