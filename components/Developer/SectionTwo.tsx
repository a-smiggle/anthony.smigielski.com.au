import Image from 'next/image';
import React from 'react';
import { InView } from 'react-intersection-observer';

function SectionTwo() {
  return (
    <InView triggerOnce threshold={0.75}>
      {({ inView, ref }) => (
        <section
          ref={ref}
          className="flex flex-col items-center justify-center px-4 py-20 md:flex-row md:justify-between"
        >
          <div
            className={`flex h-full w-full flex-col justify-center md:flex-row md:justify-between ${
              inView ? 'fade-in-tb' : ''
            }`}
          >
            <div className="flex flex-col justify-center md:w-1/2">
              <h1 fade-in-tb="4" className="text-5xl dark:text-emerald-500">
                Full Stack
              </h1>
              <h1 fade-in-tb="3" className="dark:text-emerald-500">
                Developer.
              </h1>
              <div>
                <div fade-in-tb="5" className="float-right md:hidden">
                  <Image
                    alt=""
                    src="/images/full-stack.png"
                    width={100}
                    height={100}
                  />
                </div>

                <p fade-in-tb="2" className="pt-4">
                  I am a full stack developer with a focus on Next.Js and
                  Tailwind CSS. I hope to work with businesses who are
                  environmentally conscious and ethical to help them promote
                  their brand and mission.
                </p>
                <p fade-in-tb="3" className="pt-4">
                  I&apos;m enthusiastic about further developing my Front-End
                  skills so that I can create more visually appealing client
                  facing applications.
                </p>
              </div>
            </div>
            <div className="hidden items-center justify-center md:flex md:h-full md:w-1/2 md:flex-row">
              <div fade-in-tb="5">
                <Image
                  alt=""
                  src="/images/full-stack.png"
                  width={500}
                  height={500}
                />
              </div>
            </div>
          </div>
        </section>
      )}
    </InView>
  );
}

export default SectionTwo;
