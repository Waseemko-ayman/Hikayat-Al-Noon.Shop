import CardWrapper from '@/components/Template/CardWrapper';
import Button from '@/components/atoms/Button';
import { Mail } from 'lucide-react';
import { SupportContactProps } from '@/interfaces';

const SupportContactCard = ({
  title,
  description,
  buttonLabel,
  href,
}: SupportContactProps) => {
  return (
    <CardWrapper
      otherClassName="text-center mt-16"
      contentClassName="p-8! md:p-10!"
      withFlex={false}
    >
      <h2 className="text-2xl font-semibold text-foreground">{title}</h2>

      <p className="mt-2 text-muted-foreground max-w-md mx-auto">
        {description}
      </p>

      <Button
        href={href}
        otherClassName="w-full sm:w-50! mx-auto flex items-center justify-center gap-2 mt-3"
      >
        <Mail className="size-4" />
        {buttonLabel}
      </Button>
    </CardWrapper>
  );
};

export default SupportContactCard;
