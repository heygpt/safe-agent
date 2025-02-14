export const querySecurityChecks = async <T>(
  endpoint: string,
  params?: Record<string, string | number>
): Promise<T> => {
  const { SECURITY_CHECKS_API_KEY, SECURITY_CHECKS_API_BASE_URL } = process.env;
  if (!SECURITY_CHECKS_API_BASE_URL) {
    throw new Error('Security checks API base URL is not set');
  }

  const url = new URL(`${SECURITY_CHECKS_API_BASE_URL}/${endpoint}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });
  }

  const myHeaders = new Headers();
  if (SECURITY_CHECKS_API_KEY) {
    myHeaders.append('Authorization', SECURITY_CHECKS_API_KEY);
    myHeaders.append('accept', 'application/json');
  }
  const response = await fetch(url.toString(), {
    headers: myHeaders,
    method: 'GET',
    redirect: 'follow',
  });

  if (!response.ok) {
    throw new Error(`Security checks API error: ${response.status}`);
  }

  const data = await response.json();
  return data;
};
