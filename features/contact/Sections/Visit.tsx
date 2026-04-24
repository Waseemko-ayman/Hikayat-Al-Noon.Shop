import Container from '@/components/atoms/Container';
import Layer from '@/components/atoms/Layer';
import { CONTACT_DATA } from '@/data';
import Link from 'next/link';

const Visit = () => {
  return (
    <Layer>
      <Container otherClassName="flex items-center justify-center gap-5 md:flex-row flex-col">
        <div className="flex-1">
          <Link
            href="mailto:wasimabdelhadi78@email.com"
            className="uppercase text-(--forth-color) hover:underline"
          >
            Get In Touch
          </Link>
          <h2 className="text-(--fifth-color) text-3xl mt-5 font-bold">
            Visit one of our agency locations or contact us tody
          </h2>
          <p className="text-(--fifth-color) text-bold mt-[15px] mb-5">
            Head Office
          </p>
          <ul>
            {CONTACT_DATA.map((item) => {
              const Icon = item.icon;
              return (
                <li
                  key={item.id}
                  className="flex items-start gap-3.5 not-last:mb-5"
                >
                  <Icon className="" />
                  <span className="text-(--six-color)">{item.community}</span>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex-1 w-full overflow-hidden rounded-2xl shadow-md border">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d308094.92893109133!2d34.334548544417466!3d31.441661138729188!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sar!2s!4v1675959939174!5m2!1sar!2s"
            width="600"
            height="450"
            loading="lazy"
            className="w-full h-[450px] border-0"
          />
        </div>
      </Container>
    </Layer>
  );
};

export default Visit;
