import React, { useState } from 'react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import PrimaryButton from '@/Components/PrimaryButton';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import Card from '@/Components/Card'; // Ensure Card component is imported

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  weight: number;
  location: string;
};

type PromoStatus = 'accepted' | 'declined' | null;

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 1, name: 'Item 1', price: 50, quantity: 1, weight: 2, location: 'US' },
    { id: 2, name: 'Item 2', price: 75, quantity: 2, weight: 1, location: 'CA' },
  ]);

  const [promoCode, setPromoCode] = useState<string>('');
  const [promoStatus, setPromoStatus] = useState<PromoStatus>(null);

  const handleQuantityChange = (id: number, quantity: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const handlePromoSubmit = () => {
    if (promoCode === 'DISCOUNT10') {
      setPromoStatus('accepted');
    } else {
      setPromoStatus('declined');
    }
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountedPrice = promoStatus === 'accepted' ? totalPrice * 0.9 : totalPrice;

  return (
    <div className="bg-[#121212] min-h-screen flex flex-col text-white">
      <Header activeLink={"#"} />

      <main className="container mx-auto p-6 flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
        {/* Cart Items Section */}
        <div className="flex-grow bg-[#1e1e1e] p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-6">Cart</h1>

          {/* Cart Items Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#1e1e1e] border-b border-gray-700">
                  <th className="p-4 border-b text-left">Product</th>
                  <th className="p-4 border-b text-left">Price</th>
                  <th className="p-4 border-b text-left">Quantity</th>
                  <th className="p-4 border-b text-left">Total</th>
                  <th className="p-4 border-b text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map(item => (
                  <tr key={item.id} className="border-b border-gray-700">
                    <td className="p-4">{item.name}</td>
                    <td className="p-4">${item.price}</td>
                    <td className="p-4">
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                        className="w-20 p-2 bg-gray-800 text-white rounded border border-gray-600"
                        placeholder="Quantity"
                      />
                    </td>
                    <td className="p-4">${item.price * item.quantity}</td>
                    <td className="p-4">
                      <PrimaryButton onClick={() => handleRemoveItem(item.id)}>
                        Remove
                      </PrimaryButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sidebar Section */}
        <div className="w-full md:w-1/4 space-y-6">
          {/* Cart Total */}
          <Card>
            <h2 className="text-2xl font-semibold mb-4">Cart Total</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            {promoStatus === 'accepted' && (
              <div className="flex justify-between mb-4">
                <span>Discount:</span>
                <span>-${(totalPrice * 0.1).toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-xl font-bold">
              <span>Total:</span>
              <span>${discountedPrice.toFixed(2)}</span>
            </div>
            <PrimaryButton className="mt-4 w-full bg-yellow-400 text-gray-900">
              Proceed to Checkout
            </PrimaryButton>
          </Card>

          {/* Promo Code Section */}
          <Card>
            <h2 className="text-2xl font-semibold mb-4">Promo Code</h2>
            <InputLabel htmlFor="promoCode">Enter promo code</InputLabel>
            <input
              id="promoCode"
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="w-full p-2 bg-gray-800 text-white rounded border border-gray-600"
              placeholder="Promo Code"
            />
            <PrimaryButton onClick={handlePromoSubmit} className="mt-4 w-full bg-yellow-400 text-gray-900">
              Apply
            </PrimaryButton>
            {promoStatus && (
              <InputError className={`mt-2 ${promoStatus === 'accepted' ? 'text-green-400' : 'text-red-400'}`}>
                Promo code {promoStatus === 'accepted' ? 'accepted!' : 'declined.'}
              </InputError>
            )}
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
