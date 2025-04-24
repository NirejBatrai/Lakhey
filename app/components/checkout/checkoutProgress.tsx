type CheckoutStep = 1 | 2 | 3;

interface CheckoutProgressProps {
  step: CheckoutStep;
}

const CheckoutProgress: React.FC<CheckoutProgressProps> = ({ step }) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center">
        <StepIndicator step={1} currentStep={step} label="Shipping" />
        <div className={`h-1 flex-1 mx-4 ${step >= 2 ? "bg-black" : "bg-gray-500"}`} />
        <StepIndicator step={2} currentStep={step} label="Payment" />
        <div className={`h-1 flex-1 mx-4 ${step >= 3 ? "bg-black" : "bg-gray-200"}`} />
        <StepIndicator step={3} currentStep={step} label="Confirmation" />
      </div>
    </div>
  );
};

interface StepIndicatorProps {
  step: number;
  currentStep: number;
  label: string;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ step, currentStep, label }) => (
  <div className={`flex flex-col items-center ${currentStep >= step ? "text-black" : "text-gray-400"}`}>
    <div
      className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
        currentStep >= step ? "bg-black text-white" : "bg-gray-200"
      }`}
    >
      {step}
    </div>
    <span className="text-sm font-medium">{label}</span>
  </div>
);

export default CheckoutProgress;