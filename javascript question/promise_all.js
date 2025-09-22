// Example 1: Basic Promise.all with Fetch
const fetchWithPromiseAll = async (urls) => {
  try {
    const startTime = Date.now();

    const promises = urls.map((url) =>
      fetch(url).then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
    );
    const results = await Promise.all(promises);
    const endTime = Date.now();
    console.log(`✅ Promise.all completed in ${endTime - startTime}ms`);
    return results;
  } catch (error) {
    console.log("❌ Promise.all failed:", error);
    throw error; // Entire operation fails if any request fails
  }
};

// Example 2: With Error Handling for Individual Requests
const fetchWithIndividualTimeout = async (urls, timeoutMs = 5000) => {
  const promises = urls.map((url) => {
    return new Promise(async (resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(new Error(`Timeout after ${timeoutMs}ms for ${url}`));
      }, timeoutMs);
      try {
        const response = await fetch(url);
        clearTimeout(timeoutId);

        if (!response.ok) {
          reject(new Error(`HTTP ${response.status} for ${url}`));
          return;
        }
        const data = await response.json();
        resolve(data);
      } catch (error) {
        clearTimeout(timeoutId);
        reject(error);
      }
    });
  });

  return await Promise.all(promises);
};
