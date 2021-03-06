import mp from './setup';

const orderSample = {
  status: 'pending',
  shipping: {
    first_name: 'Foo',
    last_name: 'Bar',
    address_1: 'Home',
    city: 'Istanbul',
    country: 'TR'
  }
};

test('Get orders', () => {
  return mp.getOrders().then(res => {
    expect(typeof res[0].id).toBe('string');
    expect(['pending', 'processing', 'cancelled']).toContain(res[0].status);
  });
});

test('Get Order By Id', () => {
  return mp
    .getOrders()
    .then(data => data[0].id)
    .then(id => {
      return mp.getOrderById(id).then(res => {
        expect(res.id).toBe(id);
        expect(res.status).toBeDefined();
      });
    });
});

test('Cancel Order By Id', () => {
  return mp
    .getOrders()
    .then(data => data[0].id)
    .then(id => {
      return mp.cancelOrder(id).then(res => {
        expect(res.data.order_id).toBe(id);
        expect(res.status).toBe('success');
      });
    });
});

test('Update Order By Id', () => {
  return mp
    .getOrders()
    .then(data => data[0].id)
    .then(id => {
      return mp.updateOrder(id, orderSample).then(res => {
        expect(res.status).toBe('success');
      });
    });
});
