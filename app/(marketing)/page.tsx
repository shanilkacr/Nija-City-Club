import {
  AmbianceHero,
  CTABanner,
  ImageSnapStrip,
} from "@/components/ui";
import {
  ClubAmenities,
  ClubHours,
  ClubIntro,
  ClubRules,
  EditorialImageSplit,
} from "@/components/club/ClubProfile";
import { ScrollFacilities } from "@/components/club/ScrollFacilities";
import {
  FACILITY_PANELS,
  HOME_EDITORIALS,
  HOME_STORY_SNAPS,
} from "@/config/club";

export default function HomePage() {
  return (
    <>
      <AmbianceHero
        image="/images/home/hero.jpg"
        alt="Concierge welcome at Nija City Club"
        title="A private club above the city"
        description="Reserved for members who value stillness, excellence, and the quiet privilege of belonging."
        cta={{ label: "Request Membership", href: "/membership" }}
        priority
      />

      <ClubIntro />

      <div id="facilities">
        <ScrollFacilities panels={FACILITY_PANELS} />
      </div>

      <ImageSnapStrip items={HOME_STORY_SNAPS} />

      <ClubAmenities />

      <EditorialImageSplit item={HOME_EDITORIALS[0]} />

      <ClubRules />

      <EditorialImageSplit item={HOME_EDITORIALS[1]} />

      <ClubHours />

      <EditorialImageSplit item={HOME_EDITORIALS[2]} />

      <CTABanner
        eyebrow="Visit"
        title="Request an introduction"
        description="Membership is by invitation and enquiry."
        cta={{ label: "Contact Concierge", href: "/contact" }}
        secondaryCta={{ label: "Wellness", href: "/wellness" }}
      />
    </>
  );
}
