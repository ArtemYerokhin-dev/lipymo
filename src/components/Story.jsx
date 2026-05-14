import { story } from '../assets/data/content'

export default function Story() {
  return (
    <section id="story" className="bg-paper py-12 md:py-16 px-5 md:px-[4.5rem] border-t border-oat/60">
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-8 md:gap-14 items-center">

        <div>
          <div className="eyebrow">{story.eyebrow}</div>
          <h2 className="sec-title mb-6">
            {story.title}{' '}
            <em className="text-brick" style={{ fontStyle: 'italic' }}>{story.titleItalic}</em>
          </h2>
          {story.paragraphs.map((p, i) => (
            <p key={i} className="text-[15px] text-brown-m font-light leading-[1.9] mb-3">
              {p}
            </p>
          ))}
        </div>

        <div className="relative">
          <img
            src={story.image}
            alt="Наша кухня"
            className="w-full h-[340px] object-cover rounded-2xl brightness-90 saturate-105"
          />
          <div
            className="absolute bottom-5 left-5 bg-paper/90 backdrop-blur-sm rounded-xl px-5 py-3"
            style={{ boxShadow: '0 4px 20px rgba(30,17,8,0.12)' }}
          >
            <div className="font-serif text-[12px] text-brown-l italic">з 2025 року</div>
            <div className="font-serif text-[18px] font-normal text-brown leading-tight">Ручна ліпка щодня</div>
          </div>
        </div>

      </div>
    </section>
  )
}
