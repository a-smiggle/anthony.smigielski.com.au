import Image from 'next/image';
import React from 'react';
import { InView } from 'react-intersection-observer';

function SectionTwo() {
  return (
    <InView triggerOnce threshold={0.75}>
      {({ inView, ref }) => (
        <section
          ref={ref}
          className={`flex flex-col  items-center justify-between pt-4 md:min-h-[calc(100vh-4rem)] md:snap-center md:flex-row md:border-none`}
        >
          <div className="flex h-full w-full flex-col justify-between md:flex-row">
            <div
              className={`flex flex-col justify-center md:w-1/2 ${
                inView ? 'fade-in-tb' : ''
              }`}
            >
              <h1 fade-in-tb="4" className="text-5xl dark:text-emerald-500">
                Full Stack
              </h1>
              <h1 fade-in-tb="3" className="dark:text-emerald-500">
                Developer.
              </h1>
              <div>
                <div className="float-right md:hidden">
                  <Image
                    alt=""
                    src="/images/full-stack.png"
                    width={100}
                    height={100}
                  />
                </div>

                <p fade-in-tb="2" className="pt-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Mauris nunc congue nisi vitae suscipit tellus mauris a. A diam
                  sollicitudin tempor id. Ut porttitor leo a diam sollicitudin
                  tempor id. Phasellus egestas tellus rutrum tellus
                  pellentesque. Massa tempor nec feugiat nisl pretium fusce id
                  velit ut. Blandit volutpat maecenas volutpat blandit aliquam.
                  Nam libero justo laoreet sit. Arcu dui vivamus arcu felis
                  bibendum ut tristique et egestas. Eu consequat ac felis donec
                  et odio pellentesque diam volutpat. Pellentesque adipiscing
                  commodo elit at imperdiet. Nibh praesent tristique magna sit
                  amet purus gravida quis. Lacus sed viverra tellus in hac. Sed
                  euismod nisi porta lorem mollis aliquam ut. Sed augue lacus
                  viverra vitae congue eu consequat. Dolor sit amet consectetur
                  adipiscing elit pellentesque. Et odio pellentesque diam
                  volutpat commodo sed egestas. Semper viverra nam libero justo
                  laoreet sit amet cursus. Volutpat sed cras ornare arcu dui.
                  Quisque id diam vel quam elementum pulvinar etiam non quam.
                </p>
              </div>
            </div>
            <div className="hidden justify-center md:flex md:w-1/2 md:flex-row">
              <div>
                <Image
                  alt=""
                  src="/images/full-stack.png"
                  width={250}
                  height={250}
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
