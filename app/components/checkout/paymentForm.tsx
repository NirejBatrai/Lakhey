import { FormEvent, ChangeEvent } from 'react';
import { ArrowLeft, CreditCard } from 'lucide-react';
import FormField from './formField';

interface PaymentFormData {
  cardName: string;
  cardNumber: string;
  expMonth: string;
  expYear: string;
  cvv: string;
}

interface PaymentFormErrors {
  cardName?: string;
  cardNumber?: string;
  expMonth?: string;
  expYear?: string;
  cvv?: string;
  payment?: string;
}

interface PaymentFormProps {
  formData: PaymentFormData;
  errors: PaymentFormErrors;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  formatCardNumber: (e: ChangeEvent<HTMLInputElement>) => void;
  handlePaymentSubmit: (e: FormEvent<HTMLFormElement>) => void;
  setStep: React.Dispatch<React.SetStateAction<1 | 2 | 3>>;
  isProcessing: boolean;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  formData,
  errors,
  handleChange,
  formatCardNumber,
  handlePaymentSubmit,
  setStep,
  isProcessing,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-bold mb-6 text-black">
        Payment Information
      </h2>
      {errors.payment && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {errors.payment}
        </div>
      )}
      <form onSubmit={handlePaymentSubmit}>
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <CreditCard size={24} className="mr-2 text-gray-600" />
            <h3 className="text-lg font-medium text-black">
              Credit Card
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <FormField
              name="cardName"
              label="Name on Card*"
              value={formData.cardName}
              onChange={handleChange}
              error={errors.cardName}
              maxLength={100}
            />

            <div>
              <label
                htmlFor="cardNumber"
                className="block text-sm font-medium text-black mb-1"
              >
                Card Number*
              </label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={formatCardNumber}
                placeholder="XXXX XXXX XXXX XXXX"
                maxLength={19}
                className={`w-full px-4 py-2 border rounded-md text-black ${
                  errors.cardNumber ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.cardNumber && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.cardNumber}
                </p>
              )}
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="expMonth"
                  className="block text-sm font-medium text-black mb-1"
                >
                  Exp. Month*
                </label>
                <select
                  id="expMonth"
                  name="expMonth"
                  value={formData.expMonth}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md text-black ${
                    errors.expMonth ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Month</option>
                  {Array.from({ length: 12 }, (_, i) => {
                    const month = i + 1;
                    return (
                      <option
                        key={month}
                        value={month.toString().padStart(2, "0")}
                      >
                        {month.toString().padStart(2, "0")}
                      </option>
                    );
                  })}
                </select>
                {errors.expMonth && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.expMonth}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="expYear"
                  className="block text-sm font-medium text-black mb-1"
                >
                  Exp. Year*
                </label>
                <select
                  id="expYear"
                  name="expYear"
                  value={formData.expYear}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md text-black ${
                    errors.expYear ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Year</option>
                  {Array.from({ length: 10 }, (_, i) => {
                    const year = new Date().getFullYear() + i;
                    return (
                      <option key={year} value={year.toString()}>
                        {year}
                      </option>
                    );
                  })}
                </select>
                {errors.expYear && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.expYear}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="cvv"
                  className="block text-sm font-medium text-black mb-1"
                >
                  CVV*
                </label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  maxLength={4}
                  placeholder="123"
                  className={`w-full px-4 py-2 border rounded-md text-black ${
                    errors.cvv ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.cvv && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.cvv}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-between">
          <button
            type="button"
            onClick={() => setStep(1)}
            className="flex items-center text-black hover:underline"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to Shipping
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition flex items-center"
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </>
            ) : (
              "Complete Order"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;