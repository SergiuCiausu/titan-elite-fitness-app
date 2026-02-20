import { SliderWrapper } from "../components/sliderwrapper";

export function GalerieFoto() {

    const photos = [1, 2, 3, 4, 5, 6, 7, 8];

    return (
        <div id="galerie-foto">        
            <SliderWrapper title="Galerie foto">
                {photos.map((i) => (
                    <img 
                        key={i}
                        src={`/images/landing-page/galerie-foto-${i}.jpg`} 
                        alt="Galerie" 
                        className="w-full rounded-[24px] object-cover select-none" 
                    />
                ))}
            </SliderWrapper>
        </div>
    );
}