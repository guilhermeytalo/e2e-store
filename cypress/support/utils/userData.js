export async function getUserData(useApi = false) {
  if (!useApi) {
    return {
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe',
      street: ['123 Main St', '', ''],
      city: 'New York',
      state: 'New York',
      zip: '10001',
      country: 'United States',
      phone: '5551234567'
    };
  }

  const response = await fetch('https://randomuser.me/api/?nat=us');
  const data = await response.json();
  const user = data.results[0];

  return {
    email: user.email,
    firstName: user.name.first,
    lastName: user.name.last,
    street: [user.location.street.name + ' ' + user.location.street.number, '', ''],
    city: user.location.city,
    state: user.location.state,
    zip: user.location.postcode.toString(),
    country: user.location.country,
    phone: user.phone.replace(/[^\d]/g, '').slice(0, 10)
  };
}
