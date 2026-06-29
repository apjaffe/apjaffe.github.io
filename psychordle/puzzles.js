/* ---------- DSM-5 diagnosis list (autocomplete pool) ---------- */
const DIAGNOSES = [
  // ---- Depressive disorders ----
  "Major Depressive Disorder (MDD)",
  "Major Depressive Disorder, With Psychotic Features",
  "Major Depressive Disorder, With Anxious Distress",
  "Major Depressive Disorder, With Melancholic Features",
  "Major Depressive Disorder, With Peripartum Onset",
  "Major Depressive Disorder, With Seasonal Pattern",
  "Persistent Depressive Disorder (Dysthymia)",
  "Disruptive Mood Dysregulation Disorder (DMDD)",
  "Premenstrual Dysphoric Disorder (PMDD)",
  // ---- Bipolar disorders ----
  "Bipolar I Disorder",
  "Bipolar I Disorder, With Psychotic Features",
  "Bipolar I Disorder, With Rapid Cycling",
  "Bipolar II Disorder",
  "Cyclothymic Disorder",
  // ---- Anxiety disorders ----
  "Generalized Anxiety Disorder (GAD)","Panic Disorder","Agoraphobia",
  "Social Anxiety Disorder (Social Phobia)","Specific Phobia","Separation Anxiety Disorder",
  "Selective Mutism",
  // ---- OCD & related ----
  "Obsessive-Compulsive Disorder (OCD)","Body Dysmorphic Disorder (BDD)",
  "Hoarding Disorder","Trichotillomania (Hair-Pulling Disorder)","Excoriation (Skin-Picking) Disorder",
  // ---- Trauma & stressor ----
  "Post-Traumatic Stress Disorder (PTSD)",
  "Post-Traumatic Stress Disorder, With Dissociative Symptoms",
  "Acute Stress Disorder","Adjustment Disorder",
  "Reactive Attachment Disorder","Disinhibited Social Engagement Disorder",
  // ---- Schizophrenia spectrum & psychotic ----
  "Schizophrenia","Schizoaffective Disorder","Schizophreniform Disorder",
  "Brief Psychotic Disorder","Delusional Disorder","Schizotypal Personality Disorder",
  // ---- Neurodevelopmental ----
  "Attention-Deficit/Hyperactivity Disorder (ADHD)",
  "ADHD, Predominantly Inattentive Presentation",
  "ADHD, Predominantly Hyperactive-Impulsive Presentation",
  "ADHD, Combined Presentation",
  "Autism Spectrum Disorder (ASD)",
  "Intellectual Disability (ID)","Specific Learning Disorder (SLD)","Tourette's Disorder",
  // ---- Feeding & eating ----
  "Anorexia Nervosa, Restricting Type",
  "Anorexia Nervosa, Binge-Eating/Purging Type",
  "Bulimia Nervosa","Binge-Eating Disorder (BED)",
  "Avoidant/Restrictive Food Intake Disorder (ARFID)",
  "Pica","Rumination Disorder",
  // ---- Sleep-wake ----
  "Insomnia Disorder","Hypersomnolence Disorder","Narcolepsy","Nightmare Disorder",
  // ---- Substance & addictive ----
  "Alcohol Use Disorder (AUD)","Opioid Use Disorder (OUD)","Stimulant Use Disorder","Cannabis Use Disorder",
  "Gambling Disorder",
  // ---- Somatic ----
  "Somatic Symptom Disorder","Illness Anxiety Disorder","Conversion Disorder (Functional Neurological Symptom Disorder)",
  "Factitious Disorder",
  // ---- Dissociative ----
  "Dissociative Identity Disorder (DID)","Dissociative Amnesia","Depersonalization/Derealization Disorder",
  // ---- Personality ----
  "Borderline Personality Disorder (BPD)","Narcissistic Personality Disorder (NPD)","Antisocial Personality Disorder (ASPD)",
  "Histrionic Personality Disorder","Avoidant Personality Disorder","Dependent Personality Disorder",
  "Obsessive-Compulsive Personality Disorder (OCPD)","Paranoid Personality Disorder","Schizoid Personality Disorder",
  // ---- Disruptive, impulse-control & conduct ----
  "Oppositional Defiant Disorder (ODD)","Conduct Disorder","Intermittent Explosive Disorder (IED)","Kleptomania","Pyromania",
  // ---- Neurocognitive ----
  "Delirium","Major Neurocognitive Disorder (Dementia)","Mild Neurocognitive Disorder",
  // ---- Other ----
  "Gender Dysphoria",
  "No diagnosis (culturally normative)"
];
/* extra search aliases (mostly abbreviations) so entries are easy to find by typing the short form */
const SEARCH_ALIASES = {
  "Major Depressive Disorder (MDD)":"mdd depression clinical major depressive",
  "Persistent Depressive Disorder (Dysthymia)":"pdd dysthymia",
  "Disruptive Mood Dysregulation Disorder (DMDD)":"dmdd",
  "Premenstrual Dysphoric Disorder (PMDD)":"pmdd",
  "Generalized Anxiety Disorder (GAD)":"gad anxiety",
  "Social Anxiety Disorder (Social Phobia)":"sad social phobia",
  "Obsessive-Compulsive Disorder (OCD)":"ocd",
  "Body Dysmorphic Disorder (BDD)":"bdd",
  "Post-Traumatic Stress Disorder (PTSD)":"ptsd trauma",
  "Post-Traumatic Stress Disorder, With Dissociative Symptoms":"ptsd dissociative",
  "Acute Stress Disorder":"asd acute stress",
  "Attention-Deficit/Hyperactivity Disorder (ADHD)":"adhd add attention deficit",
  "ADHD, Predominantly Inattentive Presentation":"adhd add inattentive adhd pi",
  "ADHD, Predominantly Hyperactive-Impulsive Presentation":"adhd hyperactive impulsive",
  "ADHD, Combined Presentation":"adhd combined",
  "Autism Spectrum Disorder (ASD)":"asd autism asperger aspergers",
  "Intellectual Disability (ID)":"id intellectual disability mr",
  "Specific Learning Disorder (SLD)":"sld dyslexia learning",
  "Binge-Eating Disorder (BED)":"bed binge eating",
  "Avoidant/Restrictive Food Intake Disorder (ARFID)":"arfid",
  "Alcohol Use Disorder (AUD)":"aud alcoholism alcohol",
  "Opioid Use Disorder (OUD)":"oud opioid",
  "Dissociative Identity Disorder (DID)":"did multiple personality",
  "Borderline Personality Disorder (BPD)":"bpd borderline",
  "Narcissistic Personality Disorder (NPD)":"npd narcissist",
  "Antisocial Personality Disorder (ASPD)":"aspd antisocial sociopath psychopath",
  "Obsessive-Compulsive Personality Disorder (OCPD)":"ocpd",
  "Oppositional Defiant Disorder (ODD)":"odd oppositional",
  "Intermittent Explosive Disorder (IED)":"ied anger",
  "Major Neurocognitive Disorder (Dementia)":"dementia alzheimers ncd",
  "No diagnosis (culturally normative)":"none no diagnosis normal healthy not a disorder cultural"
};

/* ---------- Cases: 3 per difficulty (escalating clues) ----------
   Each case has a `date` (YYYY-MM-DD) release date. Cases dated in the
   future are hidden; the released case with the latest date is "today's". */
const CASES = {
  easy: [
    {
      id:"easy-mdd", date:"2026-06-28", answer:"Major Depressive Disorder",
      accept:["major depressive disorder","major depression","mdd","depression","clinical depression"],
      clues:[
        "A 34-year-old client comes in saying they've felt \"empty and heavy\" for about two months. They aren't totally sure why they came today — a friend pushed them to.",
        "They describe low, sad mood nearly every day, and say they've lost interest in playing guitar and seeing friends — things that used to bring them joy.",
        "They sleep 10–11 hours but still feel exhausted, struggle to concentrate at work, and voice feelings of worthlessness and guilt.",
        "Their appetite is down with unintentional weight loss. No history of elevated or expansive mood, no substance use, and no medical cause on workup.",
        "Five-plus symptoms — including depressed mood and loss of interest — nearly every day for over two weeks, causing clear impairment. The client has good insight that this is a change from their usual self."
      ],
      teach:"A textbook presentation: ≥5 symptoms (incl. depressed mood or anhedonia) for ≥2 weeks, functional impairment, no manic/hypomanic history."
    },
    {
      id:"easy-panic", date:"2026-06-27", answer:"Panic Disorder",
      accept:["panic disorder","panic","panic attacks","panic attack disorder"],
      clues:[
        "A 29-year-old comes in worried about their heart. They've had several sudden episodes of intense fear in the past month and even went to the ER convinced something was seriously wrong.",
        "The episodes come on abruptly and peak within minutes — pounding heart, shortness of breath, sweating, trembling, and a feeling of impending doom.",
        "A full medical workup including ECG was normal. The attacks sometimes strike \"out of the blue,\" even while relaxing at home.",
        "Between attacks they now worry constantly about the next one and have started avoiding the gym and coffee in case those set one off.",
        "Recurrent unexpected panic attacks plus a month or more of persistent worry about more attacks and behavior change to prevent them — not due to a substance or medical condition. Good insight: they know the fear is out of proportion."
      ],
      teach:"Hallmark: recurrent unexpected panic attacks followed by ≥1 month of anticipatory worry or avoidance, with medical causes ruled out."
    },
    {
      id:"easy-gad", date:"2026-06-26", answer:"Generalized Anxiety Disorder",
      accept:["generalized anxiety disorder","generalised anxiety disorder","gad","generalized anxiety","generalised anxiety"],
      clues:[
        "A 41-year-old says they've been \"a worrier their whole life,\" but the past eight months have felt unmanageable.",
        "They worry about many different things — work, finances, their kids' safety, their own health — and find the worry very hard to control, most days.",
        "They report feeling restless and on edge, with muscle tension, poor sleep, irritability, and trouble concentrating.",
        "There's no discrete panic-attack pattern and no single feared object or situation; the anxiety is diffuse and free-floating across many areas of life.",
        "Excessive, hard-to-control anxiety and worry more days than not for at least six months, with multiple physical symptoms and clear distress — not better explained by another disorder. Good insight."
      ],
      teach:"Differentiated from panic (no discrete attacks) and phobia (no single trigger): pervasive worry ≥6 months plus physical symptoms like restlessness, tension, and poor sleep."
    },
    {
      id:"easy-sad", date:"2026-06-25", answer:"Social Anxiety Disorder",
      accept:["social anxiety disorder","social phobia","social anxiety disorder social phobia","social anxiety","sad"],
      clues:[
        "A 19-year-old college freshman comes in saying they've been struggling since starting school. They're fine one-on-one with people they know, but most situations involving others feel unbearable.",
        "They avoid eating in the dining hall, speaking in class, and going to parties — not because they don't want to, but because they're terrified of doing something embarrassing or being judged.",
        "In feared situations they sweat, shake, and their mind goes blank. They've been skipping classes with participation grades rather than risk speaking out loud.",
        "They recognize the fear is out of proportion to the actual threat, but that knowledge doesn't help in the moment. Their grades are slipping and they've made no close friends.",
        "Marked fear of social situations in which they may be scrutinized, leading to avoidance or endurance with intense anxiety, out of proportion to the actual threat, lasting at least 6 months, with significant impairment. Good insight."
      ],
      teach:"Core feature: fear of negative evaluation in social situations with associated avoidance. Distinguish from GAD (which adds non-social worries) and specific phobia (non-social trigger). Onset is typically in adolescence."
    },
    {
      id:"easy-ptsd", date:"2026-06-24", answer:"Post-Traumatic Stress Disorder",
      accept:["post-traumatic stress disorder","ptsd","post traumatic stress disorder","post-traumatic stress disorder ptsd","ptsd trauma"],
      clues:[
        "A 28-year-old combat veteran comes in a year after returning home. His partner urged him to seek help after he woke them up screaming for the third time last week.",
        "He describes recurring vivid nightmares and daytime flashbacks — moments when he's suddenly back in combat, heart pounding, certain he's in danger. He can't always predict what triggers them.",
        "He avoids war movies, certain roads, and news coverage. He's become emotionally withdrawn and tells his partner he feels \"dead inside.\"",
        "He's constantly scanning his environment, sleeps with a weapon nearby, and startles violently at loud noises. His irritability has led to two confrontations at work.",
        "Following a traumatic event: recurrent intrusions (nightmares, flashbacks), avoidance of trauma-related cues, negative alterations in mood and cognition, and marked hyperarousal — all lasting over a month and causing clear impairment. Limited insight — he calls it \"weakness.\""
      ],
      teach:"Four symptom clusters: intrusion, avoidance, negative alterations in cognition/mood, and hyperarousal/reactivity. Must last >1 month (if <1 month consider Acute Stress Disorder). Common for clients to attribute symptoms to personal failing rather than recognizing the disorder."
    },
    {
      id:"easy-phobia", date:"2026-06-23", answer:"Specific Phobia",
      accept:["specific phobia","specific phobia blood injection injury type","simple phobia","phobia"],
      clues:[
        "A 24-year-old is referred by their primary care doctor after fainting during a routine blood draw — not the first time. They've fainted at medical procedures before and are increasingly avoidant.",
        "They describe immediate, intense fear at the sight of needles or blood — heart races, they break out in a cold sweat, and then they feel faint. They know the danger is not real but can't override the reaction.",
        "They've refused recommended lab work, delayed a necessary dental procedure, and won't watch medical dramas. The fear is isolated to this category; everything else in life is fine.",
        "No general anxiety, no other phobias. Outside of medical encounters they function well and report good mood and no other mental health concerns.",
        "Immediate, excessive fear triggered by a specific, circumscribed stimulus — active avoidance or distress upon exposure, lasting at least 6 months, out of proportion to actual danger, causing functional impairment. Good insight."
      ],
      teach:"Specific phobia, blood-injection-injury type, uniquely features a vasovagal (fainting) response: heart rate initially rises then drops. Key: fear is bounded to one category. Avoidance of medical care is a common and dangerous consequence."
    },
    {
      id:"easy-adjustment", date:"2026-06-22", answer:"Adjustment Disorder",
      accept:["adjustment disorder","adjustment disorder with depressed mood","adjustment disorder with anxiety","adjustment disorder with mixed anxiety and depressed mood"],
      clues:[
        "A 45-year-old comes in two months after losing their job. They describe feeling sad, anxious, and unable to stop ruminating about what happened — more than they'd expect of themselves.",
        "They've had trouble sleeping, feel hopeless about the future, and have pulled away from friends. They haven't been looking for new work because \"it feels pointless.\"",
        "Symptoms track directly to the job loss. Before that they describe themselves as resilient; no significant prior history of depression or anxiety.",
        "On careful review they don't meet full criteria for a major depressive episode: not enough symptoms are present at the same time, and the distress feels entirely tied to this specific stressor.",
        "Emotional or behavioral symptoms that developed in response to an identifiable stressor, exceed what would normally be expected, and cause significant impairment — but don't meet criteria for another mental disorder. Symptoms began within 3 months of the stressor. Good insight."
      ],
      teach:"Adjustment disorder is a residual category: distress is clinically significant and stressor-linked but doesn't meet threshold for a more specific disorder. It resolves within 6 months of the stressor ending (or ongoing stressor being removed)."
    },
    {
      id:"easy-bipolar1", date:"2026-06-21", answer:"Bipolar I Disorder",
      accept:["bipolar i disorder","bipolar 1 disorder","bipolar i","bipolar 1","bipolar disorder","bipolar"],
      clues:[
        "A 23-year-old is brought to the ER by their parents after being awake for four days. They're elated, speaking very fast, and convinced they're launching a company that will change the world.",
        "They've maxed out three credit cards, sent hundreds of emails to strangers, and quit their job this week. Their speech is so fast it's hard to follow; they become irritated when others don't share their confidence.",
        "This is a dramatic departure from their baseline — normally they're described as responsible and low-key. No substance use explains the presentation; medical workup is unremarkable.",
        "They've had one past depressive episode, but nothing like this. They haven't slept meaningfully in four days and feel \"better than I've ever felt.\"",
        "A distinct period of elevated, expansive mood with increased goal-directed activity lasting over a week, with at least three manic symptoms (decreased need for sleep, grandiosity, pressured speech, reckless spending) — severe enough that hospitalization is warranted."
      ],
      teach:"A single manic episode is sufficient for Bipolar I — no depressive episode is required, though most people have them. Unlike hypomania, mania lasts ≥7 days, causes marked impairment, and may require hospitalization."
    },
    {
      id:"easy-anorexia", date:"2026-06-20", answer:"Anorexia Nervosa, Restricting Type",
      accept:["anorexia nervosa restricting type","anorexia nervosa, restricting type","anorexia nervosa","anorexia"],
      clues:[
        "A 17-year-old is brought in by their parents after eight months of weight loss. The client says they're \"just eating healthy\" and doesn't see what the concern is.",
        "They restrict intake to around 700 calories a day, avoid any food they consider \"unsafe,\" and weigh themselves multiple times daily. Their BMI is significantly below what's healthy for their age.",
        "They become visibly distressed when meals deviate from their plan. Their periods have stopped and their hair is thinning, but they say they feel fine.",
        "Asked whether they think they're too thin, they say they still \"feel fat\" and express intense fear of gaining weight — even as others can visibly see their bones.",
        "Restriction of energy intake leading to significantly low body weight; intense fear of weight gain or behavior that interferes with gaining weight; and disturbed body image or persistent lack of recognition of the seriousness of low weight. No binge or purge behavior."
      ],
      teach:"Three criteria: low weight, fear of weight gain, and distorted body image or lack of insight. Restricting type means no binge/purge behavior in the past 3 months. Physical consequences (amenorrhea, lanugo, electrolyte disturbance) signal severity."
    },
    {
      id:"easy-insomnia", date:"2026-06-19", answer:"Insomnia Disorder",
      accept:["insomnia disorder","insomnia","chronic insomnia","primary insomnia"],
      clues:[
        "A 38-year-old comes in frustrated about sleep problems going on for eight months. \"I just can't turn my brain off at night,\" they say.",
        "They lie awake one to two hours before falling asleep, then wake several times. Total sleep is four to five hours. They feel exhausted all day and have started dreading bedtime.",
        "Work performance is suffering and they're irritable at home. They've tried every sleep hygiene tip they know — nothing helps.",
        "No mood disorder, no substance use, no medical cause on workup. Interestingly, they sleep fine on vacation — which makes them suspect the problem is psychological, not physical.",
        "Difficulty initiating and maintaining sleep, occurring at least three nights a week for at least three months, causing significant daytime distress or impairment, not explained by another condition or substance. Good insight."
      ],
      teach:"Insomnia disorder requires the 3×3 rule: ≥3 nights/week, ≥3 months. Sleeping better on vacation (where performance anxiety about sleep drops) is classic and diagnostically informative, not evidence the problem is imaginary."
    },
    {
      id:"easy-aud", date:"2026-06-18", answer:"Alcohol Use Disorder",
      accept:["alcohol use disorder","alcohol use disorder aud","aud","alcoholism","alcohol dependence"],
      clues:[
        "A 46-year-old comes in at their spouse's urging. \"My wife thinks I drink too much, but I just need it to relax after work.\"",
        "They drink every evening, starting with \"two beers to take the edge off\" but most nights finishing six to eight. They've tried to cut back several times without success.",
        "They've called in sick twice because of hangovers, and their spouse says they're emotionally unavailable. They keep alcohol at work \"just in case.\"",
        "They shake in the morning until they have their first drink of the day. They've also noticed they need significantly more alcohol than they used to in order to feel the same effect.",
        "A pattern of alcohol use causing significant impairment over 12 months: tolerance, morning withdrawal tremors, drinking more than intended, repeated failed efforts to cut back, continued use despite interpersonal consequences, and craving."
      ],
      teach:"AUD is diagnosed dimensionally: 2–3 criteria = mild, 4–5 = moderate, ≥6 = severe. Morning tremors (withdrawal) and tolerance are physiological markers. Minimization and denial are part of the clinical picture, not evidence against the diagnosis."
    },
    {
      id:"easy-separation", date:"2026-06-17", answer:"Separation Anxiety Disorder",
      accept:["separation anxiety disorder","separation anxiety"],
      clues:[
        "A 32-year-old comes in after falling apart when their spouse took a two-week work trip. \"I was convinced something terrible was going to happen to them.\"",
        "They describe excessive worry about harm coming to their spouse during any separation. They called and texted constantly, couldn't sleep, and had nightmares about losing them.",
        "They've declined their own work travel because the thought of being separated is unbearable. They feel physically sick at airport drop-offs.",
        "The pattern has been present for years — a similar dynamic occurred with their mother growing up. The fear is specifically about separation from attachment figures, not about public spaces or general disaster.",
        "Excessive, developmentally inappropriate fear about separation from attachment figures — with anticipatory distress, worry about harm, and sleep difficulty when separated — lasting at least 4 weeks, causing significant impairment. Okay insight — they describe it as \"a personality flaw.\""
      ],
      teach:"Separation anxiety disorder can be diagnosed in adults (DSM-5 removed the childhood-only restriction). Key: the fear is specifically about loss of or harm to attachment figures, not public spaces (agoraphobia) or generalized catastrophe (GAD)."
    },
    {
      id:"easy-adhd-child", date:"2026-06-16", answer:"Attention-Deficit/Hyperactivity Disorder",
      accept:["adhd","attention deficit hyperactivity disorder","attention-deficit/hyperactivity disorder","adhd combined presentation","adhd combined","adhd, combined presentation","add"],
      clues:[
        "An 8-year-old boy is referred by his teacher after months of classroom disruption. His parents confirm the same behaviors appear at home and in after-school activities.",
        "He blurts out answers before questions are finished, can't wait his turn in games, and gets out of his seat constantly. He's described as \"always on the go, like driven by a motor.\"",
        "He also loses assignments, forgets to bring home materials, and can't sustain attention on anything that doesn't immediately interest him. His desk is perpetually chaotic.",
        "Symptoms have been present since kindergarten. His IQ is average, vision and hearing are normal, and his pediatrician finds no medical explanation.",
        "Six or more inattentive symptoms and six or more hyperactive-impulsive symptoms, present across at least two settings (home and school) since before age 12, causing clear academic and social impairment."
      ],
      teach:"ADHD, Combined Presentation requires ≥6 symptoms in both the inattentive and hyperactive-impulsive clusters. Cross-setting presence (home and school) and onset before age 12 are essential criteria, not optional features."
    }
  ],
  medium: [
    {
      id:"med-bipolar2", date:"2026-06-28", answer:"Bipolar II Disorder",
      accept:["bipolar ii","bipolar 2","bipolar two","bipolar ii disorder","bipolar 2 disorder"],
      clues:[
        "A 27-year-old comes in seeking help for recurring depression that they say \"antidepressants never quite fix.\"",
        "They report several depressive episodes over the past few years — low mood, fatigue, hopelessness, and trouble getting through the workday.",
        "Asked about their better stretches, they mention occasional periods of feeling unusually energized, needing little sleep yet feeling rested, and being very productive — \"just my good weeks.\"",
        "During those stretches others noticed they were more talkative and started lots of projects. They were never hospitalized and kept functioning.",
        "These elevated periods last about 4–5 days and are a clear change from their usual self, but cause no marked impairment and no psychotic features.",
        "Pattern: at least one hypomanic episode plus at least one major depressive episode, and never a full manic episode. Insight is okay — they tend to minimize the \"up\" periods as just feeling good."
      ],
      teach:"Frequently misdiagnosed as unipolar depression because clients rarely report hypomania as a problem. Hallmark: hypomania + MDE, no full mania."
    },
    {
      id:"med-ocd", date:"2026-06-27", answer:"Obsessive-Compulsive Disorder",
      accept:["obsessive compulsive disorder","obsessive-compulsive disorder","ocd","obsessive compulsive"],
      clues:[
        "A 24-year-old reluctantly discloses \"horrible thoughts\" they're terrified to say out loud, and seems deeply ashamed.",
        "They describe intrusive, unwanted images of harming people they love — thoughts that horrify them and feel completely against their values.",
        "There is no cleanliness or hand-washing theme at all. Instead they perform silent mental rituals — repeating phrases, praying, mentally \"reviewing\" — to neutralize the thoughts.",
        "They've begun avoiding being alone with loved ones and hiding kitchen knives, and the rituals now eat well over an hour a day.",
        "They recognize the thoughts are products of their own mind and don't want to act on them; the urge is to relieve unbearable anxiety, not a wish to do harm.",
        "Obsessions (egodystonic intrusive thoughts) plus compulsions (covert mental acts) that are time-consuming and impairing. Insight is good-to-okay — they fear they're \"a monster,\" a common but mistaken self-appraisal in this disorder."
      ],
      teach:"A subtle, often-missed presentation: harm/taboo obsessions with purely mental compulsions and no overt washing/checking. Egodystonic content distinguishes it from genuine intent."
    },
    {
      id:"med-bulimia", date:"2026-06-26", answer:"Bulimia Nervosa",
      accept:["bulimia nervosa","bulimia"],
      clues:[
        "A 22-year-old college student presents with fatigue, tooth sensitivity, and irregular periods, and mentions feeling \"out of control around food.\"",
        "They describe recurrent episodes of eating unusually large amounts in a short time, with a sense that they can't stop once they start.",
        "Afterward they feel intense guilt and compensate — self-induced vomiting, with occasional over-exercising or laxative use.",
        "Their body weight sits in the normal range, which is part of why no one has noticed; their self-worth is heavily tied to body shape and weight.",
        "Exam reveals eroded dental enamel and small calluses on the knuckles, and labs show mildly low potassium.",
        "Binges plus inappropriate compensatory behaviors, on average at least weekly for three months, with self-evaluation unduly influenced by shape/weight — and not occurring exclusively during anorexia. Insight is okay; shame drives concealment."
      ],
      teach:"Unlike anorexia, weight is typically normal, masking the disorder. Physical tells: enamel erosion, knuckle calluses (Russell's sign), and electrolyte disturbance."
    },
    {
      id:"med-pdd", date:"2026-06-25", answer:"Persistent Depressive Disorder",
      accept:["persistent depressive disorder","dysthymia","persistent depressive disorder dysthymia","pdd","chronic depression"],
      clues:[
        "A 35-year-old comes in saying they've \"just always been this way\" — low mood, low energy, low self-esteem — \"for as long as I can remember, honestly.\"",
        "They describe functioning but feeling empty. They get through the workday but take no real satisfaction from anything. Weekends don't help; they just feel flat.",
        "They've tried two antidepressants in the past without much benefit. They don't recall a stretch in the past several years when they felt consistently okay for more than a couple of weeks.",
        "Low energy, poor concentration, feelings of hopelessness, mildly disrupted sleep — but on careful review they haven't met full MDD criteria at any given moment. No history of mania or hypomania.",
        "Depressed mood more days than not for at least two years, with at least two additional depressive symptoms, never free of symptoms for more than two months at a stretch. Good insight — they just frame it as \"who I am.\""
      ],
      teach:"Often called 'double depression' when an MDE occurs on top of PDD. Key differentiator from MDD: chronicity (≥2 years), not symptom severity. Clients often experience their depression as a personality trait rather than a treatable illness."
    },
    {
      id:"med-bpd", date:"2026-06-24", answer:"Borderline Personality Disorder",
      accept:["borderline personality disorder","bpd","borderline personality disorder bpd","borderline"],
      clues:[
        "A 26-year-old comes in following a breakup they describe as \"the worst thing that's ever happened to me\" — the third time in a year they've presented in crisis over a relationship ending.",
        "They describe relationships that start with intensity — \"I've never felt so understood, it was perfect\" — and collapse suddenly into rage or despair when the other person disappoints them.",
        "When relationships end they feel empty and \"like I don't exist.\" They've cut themselves on several occasions to \"feel something\" or relieve unbearable emotional pain.",
        "Their sense of self shifts dramatically depending on who they're with. They've changed career paths twice and adopted and dropped different identities over the past two years.",
        "A pervasive pattern of unstable relationships, identity disturbance, and affect dysregulation, with impulsivity: frantic efforts to avoid abandonment, unstable intense relationships, self-harm, chronic emptiness, and reactive mood. At least 5 of 9 criteria, present since early adulthood. Okay insight."
      ],
      teach:"BPD is frequently misdiagnosed as bipolar disorder. The key difference: mood shifts in BPD are reactive to interpersonal events (minutes to hours), not sustained episodes. Identity disturbance and abandonment sensitivity are defining features."
    },
    {
      id:"med-avpd", date:"2026-06-23", answer:"Avoidant Personality Disorder",
      accept:["avoidant personality disorder","avpd","avoidant personality","avoidant personality disorder avpd"],
      clues:[
        "A 33-year-old seeks therapy saying they're \"too shy and weird to have a real life.\" They've never had a romantic relationship and have only one friend, whom they've known since childhood.",
        "They desperately want close relationships but believe others will find them boring or fundamentally flawed once they get to know them. They hold back in conversations to avoid saying something embarrassing.",
        "They've turned down two promotions because the roles would require presenting to groups. They eat lunch alone every day and have declined every social invitation from coworkers for years.",
        "Unlike someone content with solitude, this client is in ongoing pain — they yearn for connection but feel certain rejection is inevitable the moment they let people in.",
        "A pervasive pattern (since early adulthood) of social inhibition, feelings of inadequacy, and hypersensitivity to negative evaluation — avoiding occupational activities with interpersonal contact, restraint in relationships for fear of ridicule, viewing themselves as inferior. At least 4 of 7 criteria. Limited insight."
      ],
      teach:"Avoidant PD and Social Anxiety Disorder overlap heavily, but AvPD reflects a pervasive self-concept of fundamental inadequacy — not just situational fear. Clients want connection intensely; that yearning distinguishes them from schizoid presentation."
    },
    {
      id:"med-hoarding", date:"2026-06-22", answer:"Hoarding Disorder",
      accept:["hoarding disorder","hoarding","compulsive hoarding"],
      clues:[
        "A 58-year-old is referred by their adult children, who discovered the state of the apartment during a health scare. The client came reluctantly and minimizes the concern.",
        "Every room except the bathroom is packed floor-to-ceiling with newspapers, boxes, and miscellaneous objects — the kitchen and living room are functionally inaccessible.",
        "The client becomes distressed when asked about discarding anything and can articulate a reason to keep every object. The thought of throwing away a ten-year-old magazine causes genuine anxiety.",
        "They deny it's a problem: \"I know where everything is.\" But they haven't had guests in twelve years and their children report food safety concerns and fire hazards.",
        "Persistent difficulty discarding possessions regardless of actual value, driven by perceived need to save them and distress when discarding, resulting in clutter that compromises the living space. Limited insight — they don't experience the hoarding as a problem."
      ],
      teach:"Hoarding disorder is distinct from OCD: the relationship to possessions is ego-syntonic (the client sees value in keeping, not a senseless compulsion to resist). Insight ranges from good to absent — limited or absent insight is common and affects treatment."
    },
    {
      id:"med-somatic", date:"2026-06-21", answer:"Somatic Symptom Disorder",
      accept:["somatic symptom disorder","ssd","somatic symptom disorder ssd","somatic symptom"],
      clues:[
        "A 44-year-old has seen seven specialists over three years for persistent, severe abdominal pain and fatigue. Extensive workup — endoscopy, imaging, bloodwork — has been consistently normal.",
        "They check their symptoms online daily, keep a detailed pain diary, and bring thick folders of medical records to every appointment. They're convinced something serious is being missed.",
        "They've quit their job because of the pain, and family life has organized around managing their symptoms. Health is their primary topic of conversation.",
        "They're not fabricating — the pain is real and distressing. But reassurance from physicians provides only brief relief before the worry returns, and their response to health information is disproportionate.",
        "One or more distressing somatic symptoms plus excessive thoughts, feelings, or behaviors: disproportionate worry, persistently high health anxiety, or excessive time devoted to symptoms — lasting more than 6 months. Insight is limited — they believe a physical cause is being missed."
      ],
      teach:"SSD does not require medically unexplained symptoms — someone with a confirmed diagnosis (e.g., IBS) can still qualify if their psychological response is disproportionate. The diagnosis lives in the quality of the response, not the absence of a medical finding."
    },
    {
      id:"med-bed", date:"2026-06-20", answer:"Binge-Eating Disorder",
      accept:["binge-eating disorder","binge eating disorder","bed","binge eating disorder bed","binge eating"],
      clues:[
        "A 38-year-old comes in wanting to \"get control of my eating.\" They've been on and off diets for twenty years and feel disgusted with themselves.",
        "They describe episodes — roughly twice a week — of eating a very large amount in under two hours, always in secret: finishing a full pizza, a pint of ice cream, and a bag of chips in one sitting.",
        "During these episodes they feel unable to stop, eat much faster than usual, and continue well past fullness. Afterward they feel intensely ashamed and depressed.",
        "Critically, there is no compensatory behavior — no purging, excessive exercise, or fasting. They attribute their weight to \"no willpower,\" which is not the correct frame.",
        "Recurrent binge episodes (at least once weekly for 3 months) marked by loss of control and significant distress — without the compensatory behaviors that define bulimia. Insight is okay; shame prevents disclosure."
      ],
      teach:"BED is the most common eating disorder and frequently missed in primary care. Key distinction from bulimia: no compensatory behaviors. The core pathology is loss of control and distress, not simply eating a large amount."
    },
    {
      id:"med-npd", date:"2026-06-19", answer:"Narcissistic Personality Disorder",
      accept:["narcissistic personality disorder","npd","narcissistic personality disorder npd","narcissistic personality"],
      clues:[
        "A 42-year-old attorney comes in at the suggestion of their second wife, who says they have \"no empathy.\" The client agrees to come only after framing therapy as a way to address \"people who don't appreciate them.\"",
        "They describe colleagues as incompetent and subordinates as lucky to work for them. They're furious about being passed over for partnership — \"obviously political; the committee is threatened by me.\"",
        "They expect special treatment from staff, expect deference in relationships, and become coldly contemptuous when slighted. They've ended friendships abruptly when people \"stopped showing up\" for them.",
        "Exploring relationships reveals they struggle to recognize others' feelings unless those others are serving a function for them. Their wife's complaints about loneliness are genuinely baffling to them.",
        "A pervasive pattern (since early adulthood): grandiose self-importance, preoccupation with success and power, sense of entitlement, interpersonally exploitative, lack of empathy, envy, and arrogance. At least 5 of 9 criteria. Limited insight."
      ],
      teach:"NPD often surfaces in therapy when external events challenge the grandiose self-image (a career setback, a leaving spouse). True empathy deficit — not just self-centeredness — is a core diagnostic feature, not a value judgment."
    },
    {
      id:"med-ptsd-dissoc", date:"2026-06-18", answer:"Post-Traumatic Stress Disorder, With Dissociative Symptoms",
      accept:["post-traumatic stress disorder with dissociative symptoms","ptsd with dissociative symptoms","ptsd dissociative subtype","ptsd, with dissociative symptoms","ptsd dissociative","ptsd with dissociation"],
      clues:[
        "A 31-year-old survivor of childhood abuse describes flashbacks that go beyond re-experiencing — during episodes, they feel completely detached from their own body, like watching themselves from across the room.",
        "Throughout the day they experience periods of feeling unreal, as if they're in a dream. Long stretches of time sometimes pass with no clear memory of what happened.",
        "They meet full PTSD criteria: intrusive memories, nightmares, avoidance, negative mood changes, and hyperarousal — present for years following prolonged early-life trauma.",
        "The depersonalization and derealization are not explained by substances, a medical condition, or another dissociative disorder. They emerge around trauma reminders but also occur without obvious trigger.",
        "Full PTSD criteria plus persistent or recurrent depersonalization (detachment from one's mental processes or body) or derealization (sense of unreality of surroundings). Insight is okay — they understand the connection to their history."
      ],
      teach:"The dissociative subtype of PTSD is associated with high burden of early/chronic trauma and emotional overmodulation (vs. undermodulation in classic PTSD). Standard prolonged exposure may need modification — dissociation can interfere with processing."
    },
    {
      id:"med-schizoaffective", date:"2026-06-17", answer:"Schizoaffective Disorder",
      accept:["schizoaffective disorder","schizoaffective","schizoaffective disorder bipolar type","schizoaffective disorder depressive type"],
      clues:[
        "A 29-year-old is brought in by their roommate after a week of not sleeping, apparent conversations with people who aren't there, and urgent notes about being monitored by the government.",
        "On exam they're expansive, speak rapidly, and describe a special mission only they can perceive. They report hearing voices that comment on their actions and confirm their importance.",
        "After two weeks of antipsychotics, the elevated mood and pressured speech resolve — but the voices and persecutory beliefs persist for several more weeks in the absence of prominent mood symptoms.",
        "Chart review shows two prior episodes: once a depressive episode with mood-congruent delusions, and once a manic-like episode. Between episodes they function marginally with residual odd thinking.",
        "An uninterrupted period includes both a major mood episode and core psychotic symptoms. Crucially, delusions or hallucinations were present for at least two weeks without prominent mood symptoms — this is the key distinction. Insight is very limited."
      ],
      teach:"The critical differentiator: psychotic symptoms persist for ≥2 weeks independent of mood episodes. In mood disorder with psychotic features, psychosis appears only during mood episodes. Schizoaffective sits on the spectrum between schizophrenia and mood disorders."
    },
    {
      id:"med-asd", date:"2026-06-16", answer:"Acute Stress Disorder",
      accept:["acute stress disorder","asd acute stress","acute stress"],
      clues:[
        "A 25-year-old comes in five days after a serious car accident in which they witnessed a passenger badly injured. \"I can't stop seeing it. I feel like I'm going crazy.\"",
        "They describe intrusive images of the crash forcing themselves into awareness, a sense of reliving it when they close their eyes, and feeling detached from their own body since it happened.",
        "They've been unable to drive, avoid any roads or news coverage about accidents, can't sleep, and have had two panic responses to sudden loud noises at work.",
        "They know what they're experiencing is a response to the trauma — insight is intact — but the symptoms feel uncontrollable. It's been five days and the intensity hasn't diminished.",
        "Following a traumatic event: at least 9 of 14 symptoms across intrusion, negative mood, dissociation, avoidance, and arousal clusters — lasting between 3 days and 1 month, with significant distress or impairment."
      ],
      teach:"Acute Stress Disorder is the diagnosis for the first month post-trauma (3 days–1 month). Dissociative symptoms feature more prominently in ASD than in PTSD criteria. ASD may or may not progress to PTSD — it's not a guaranteed precursor."
    }
  ],
  hard: [
    {
      id:"hard-adhd", date:"2026-06-28", answer:"Attention-Deficit/Hyperactivity Disorder",
      accept:["adhd","attention deficit hyperactivity disorder","attention-deficit/hyperactivity disorder","attention deficit hyperactivity","add","attention deficit disorder","adhd predominantly inattentive presentation"],
      clues:[
        "A 31-year-old woman is referred after seeking treatment for \"anxiety\" that hasn't responded well to several rounds of therapy.",
        "She feels chronically overwhelmed and behind, and is ashamed she \"can't keep it together\" the way her peers seem to.",
        "She describes a lifelong pattern of losing things, missing deadlines, and difficulty sustaining attention on paperwork — but she's bright and verbal and earned good grades through enormous effort.",
        "She rarely looks outwardly hyperactive. Instead she describes internal restlessness and \"a brain that won't slow down.\" As a child she was called a quiet daydreamer, never a behavior problem.",
        "The inattentive pattern has been present for years across both home and work and clearly predates the anxiety, which looks secondary to years of struggling and self-blame.",
        "Consider sex/gender differences: girls and women far more often show the inattentive, non-disruptive presentation, so the condition is missed in childhood and later mislabeled as anxiety or depression.",
        "Criteria: ≥6 inattentive symptoms, several present before age 12, across ≥2 settings, causing impairment, not better explained by another disorder. Insight is limited — she blames her character rather than recognizing a treatable, lifelong condition."
      ],
      teach:"A bias-check case: an adult woman with inattentive-type ADHD masked by intelligence and effort, commonly misdiagnosed as anxiety. Onset must predate age 12 and span multiple settings."
    },
    {
      id:"hard-cultural", date:"2026-06-27", answer:"No diagnosis (culturally normative)",
      accept:["no diagnosis","no diagnosis culturally normative","none","no disorder","not a disorder","no mental disorder","culturally normative","normal","healthy","no mental illness"],
      clues:[
        "A 38-year-old recent immigrant is brought in by a worried coworker who says they've been \"talking to spirits.\"",
        "The client calmly describes hearing the voice of a deceased grandparent offering guidance, and occasionally sensing their presence during prayer.",
        "These experiences occur within their religious and cultural practices around ancestor veneration, and are shared and validated by their community.",
        "There is no decline in functioning, no disorganized thinking, no distress about the experiences, and no other psychotic symptoms; they sleep, work, and relate normally.",
        "Family and community members report the same kinds of experiences as expected, meaningful, and reassuring — not alarming.",
        "Check your own cultural lens: experiences that resemble hallucinations may be entirely normative within a cultural or religious framework rather than evidence of illness.",
        "No impairment, no distress, fully congruent with cultural norms, and not better explained by a mental disorder. The clinically correct call here is that this is not a mental disorder."
      ],
      teach:"A bias-check case: DSM-5 explicitly excludes culturally sanctioned responses (e.g., hearing a deceased relative's voice in some communities) from being labeled disorders when there is no distress or impairment."
    },
    {
      id:"hard-autism", date:"2026-06-26", answer:"Autism Spectrum Disorder",
      accept:["autism spectrum disorder","autism","asd","autism spectrum","aspergers","asperger s","aspergers syndrome"],
      clues:[
        "A 29-year-old woman seeks help for \"burnout\" and exhaustion after social events, plus long-standing anxiety and depression that treatment only partly helps.",
        "She describes rehearsing conversations in advance, copying others' facial expressions, and feeling like she's \"performing\" to fit in — then collapsing afterward.",
        "She has intense, focused interests, strong sensory sensitivities to noise and clothing textures, and a deep need for routine that she's learned to hide.",
        "As a girl she had one or two close friends and was seen as \"shy but fine\"; she taught herself social scripts that masked her difficulties from teachers.",
        "She struggles to read subtle social cues and with back-and-forth reciprocity, despite superficially smooth social skills built from years of effort.",
        "Consider sex/gender differences: women more often camouflage social-communication differences and show less overt repetitive behavior, leading to late or missed diagnosis and frequent mislabeling as anxiety or borderline personality.",
        "Persistent social-communication deficits plus restricted/repetitive patterns (intense interests, routines, sensory sensitivity), present since early development, impairing once social demands outstripped her masking. Insight is okay-to-limited — she's concluded she's simply \"bad at being a person.\""
      ],
      teach:"A bias-check case: camouflaging in women masks autism, which is then mislabeled as anxiety or BPD. Core features (social-communication deficits + restricted/repetitive behaviors) must trace to early development."
    },
    {
      id:"hard-pmdd", date:"2026-06-25", answer:"Premenstrual Dysphoric Disorder",
      accept:["premenstrual dysphoric disorder","pmdd","premenstrual dysphoric disorder pmdd"],
      clues:[
        "A 30-year-old comes in saying her relationships and job are suffering due to \"extreme PMS.\" Her partner says she's \"like a different person\" for about ten days every month.",
        "In the week before her period she experiences marked irritability and emotional lability — snapping at people, then crashing into despair, then feeling crushing shame about it.",
        "She also reports bloating, breast tenderness, feeling overwhelmed and hopeless, and difficulty concentrating. These symptoms disappear completely within a day or two of her period starting.",
        "She has no depressive episodes outside the premenstrual window. A mood chart kept over two cycles confirms the symptoms cluster reliably in the luteal phase and are absent in the follicular phase.",
        "Confirmed by prospective ratings over at least two cycles: ≥5 symptoms in the week before menses including at least one core affective symptom (irritability, lability, dysphoria, anxiety), improving after menses, absent post-menstrually — causing significant impairment. Insight is good.",
        "The client initially resists the diagnosis, worried it \"pathologizes being a woman.\" She needs to understand this is a distinct and treatable disorder, not a character flaw or normal cycle variation.",
        "Ruling in: the strict cyclical timing, confirmed prospectively, with complete remission post-menses, and clear occupational and relationship impairment across multiple cycles. Ruling out: MDD, bipolar, and PMS (which lacks the severity and functional impact)."
      ],
      teach:"PMDD requires prospective confirmation over ≥2 cycles — retrospective recall over-estimates prevalence. Key differentiator from MDD: complete remission after menses, with a symptom-free follicular phase. Effective treatments include SSRIs (even luteal-phase-only dosing) and hormonal therapies."
    },
    {
      id:"hard-dpdr", date:"2026-06-24", answer:"Depersonalization/Derealization Disorder",
      accept:["depersonalization derealization disorder","depersonalization/derealization disorder","dpdr","depersonalization disorder","derealization disorder","depersonalization","derealization"],
      clues:[
        "A 22-year-old comes in saying something is very wrong but struggles to describe it. \"I feel like I'm watching myself from outside my body. Like I'm not real.\"",
        "They describe the world seeming like a movie set — colors slightly off, things looking flat or dreamlike, familiar places feeling unfamiliar. This has been nearly constant for seven months.",
        "They're terrified this means they're \"going crazy\" or have a brain tumor. They've had two ER visits; neurology found nothing. No substance use; full workup is negative.",
        "Crucially, reality testing is intact — they know they are real and the world is real, even as they feel the opposite. This preserved insight rules out psychosis.",
        "When pressed they describe the experience as two-layered: they're functioning, holding conversations, going to class — but feeling as though a glass wall separates them from everything, including their own body.",
        "The symptoms began during a period of high stress and sleep deprivation. They've worsened every time the client focuses on them — a self-perpetuating anxiety loop.",
        "Persistent or recurrent depersonalization or derealization with intact reality testing, causing significant distress or impairment, not attributable to substances, a medical condition, or another mental disorder."
      ],
      teach:"Intact reality testing ('I know I'm real, but I don't feel real') is the essential differentiator from psychosis. DPDR is frequently misidentified as psychosis or a neurological condition. Anxiety about the symptoms typically maintains them — the paradox of trying to feel real makes it worse."
    },
    {
      id:"hard-conversion", date:"2026-06-23", answer:"Conversion Disorder (Functional Neurological Symptom Disorder)",
      accept:["conversion disorder","functional neurological symptom disorder","conversion disorder functional neurological symptom disorder","fnd","functional neurological disorder","conversion"],
      clues:[
        "A 27-year-old presents to neurology with sudden onset of right arm weakness and seizure-like shaking episodes that started three weeks ago. No prior neurological history.",
        "EEG during an episode is normal. Brain MRI and full neurological workup are unremarkable. The shaking doesn't follow expected seizure patterns and stops reliably when attention is diverted.",
        "The arm weakness shows positive clinical signs: Hoover's sign is positive (hip extension normalizes when attention is directed elsewhere), and performance is inconsistent with a fixed neurological lesion.",
        "Significant psychosocial stressors immediately preceded onset — a relationship breakdown and job loss in the same week. The client had a brief episode of unexplained vision loss as a teenager.",
        "Symptoms of altered voluntary motor or sensory function, with clinical evidence that the symptom pattern is internally inconsistent and incompatible with recognized neurological disease. The client is not faking — the symptoms are real and distressing.",
        "The client is upset and feels dismissed: \"Are you saying it's all in my head?\" A careful explanation is needed: the nervous system is producing real symptoms, but through a functional (not structural) mechanism.",
        "Ruling in: positive signs of functional neurological disorder (Hoover's sign, distractibility), normal workup, acute onset in context of stress. Ruling out: malingering (no evident gain) and factitious disorder (symptoms are not intentionally produced)."
      ],
      teach:"FND/Conversion disorder is diagnosed positively via clinical signs — not simply by exclusion. Hoover's sign, distractibility, and tremor entrainment are key. Symptoms are genuine, not feigned (cf. malingering or factitious disorder). Avoid framing as 'psychological' vs. 'real' — the dichotomy is unhelpful and inaccurate."
    },
    {
      id:"hard-cyclothymia", date:"2026-06-22", answer:"Cyclothymic Disorder",
      accept:["cyclothymic disorder","cyclothymia","cyclothymia disorder","cyclothymic"],
      clues:[
        "A 24-year-old describes a pattern stretching back to late adolescence: weeks of feeling energized, sleeping little, and being highly productive, alternating with weeks of low motivation, withdrawal, and mild hopelessness.",
        "In the \"up\" periods they make impulsive decisions and start projects they don't finish. In the \"down\" periods they call in sick and isolate. Neither phase feels like a crisis — they've learned to ride the waves.",
        "They've never had a period longer than two months of stable mood in the past two years. But on careful review they've never fully met criteria for a manic episode, a hypomanic episode, or a major depressive episode.",
        "They're frustrated that prior clinicians didn't take the pattern seriously: \"I'm told I just have 'mood swings' but no one does anything.\" The instability is affecting relationships and work consistency.",
        "The pattern is longstanding and pervasive. Ruling out: bipolar I and II (sub-threshold symptoms on both poles), MDD (sub-threshold depressive periods), ADHD (the cycling is affective, not attentional), and personality disorder.",
        "Consider the clinical significance carefully: sub-threshold doesn't mean sub-impairment. This client has not been symptom-free for more than two months in the past two years.",
        "Numerous periods of hypomanic-like symptoms and depressive-like symptoms over at least 2 years, never meeting full criteria for hypomania, mania, or MDE — present at least half the time, never symptom-free >2 months. Insight is limited — they see it as temperament."
      ],
      teach:"Cyclothymia is frequently dismissed because individual episodes don't meet threshold criteria — but two years of near-continuous sub-threshold cycling carries real impairment and risk of progression to Bipolar I or II. A single MDE or manic episode at any point rules out the diagnosis."
    },
    {
      id:"hard-schizotypal", date:"2026-06-21", answer:"Schizotypal Personality Disorder",
      accept:["schizotypal personality disorder","schizotypal","schizotypal personality"],
      clues:[
        "A 34-year-old is referred by their PCP who noted \"unusual thinking.\" The client came in for anxiety but spent most of the visit describing their sensitivity to others' \"energies\" and a belief that strangers' glances carry personal messages.",
        "They have one or two acquaintances but no close friends, and prefer it this way. Social situations are acutely uncomfortable — they describe feeling like a permanent outsider even among people who seem to like them.",
        "Their speech is tangential and overly metaphorical. They describe practicing thought projection — believing they can influence events with their mind — and they notice meaningful coincidences others miss.",
        "There is no history of frank psychosis, no sustained delusions or hallucinations, though they experience brief perceptual distortions under stress. They are not disconnected from reality.",
        "These patterns have been stable since adolescence. The client isn't troubled by their magical beliefs — those feel accurate to them. The social discomfort and anxiety are what brought them in.",
        "Consider the spectrum carefully: this presentation shares features with schizophrenia (magical thinking, odd speech, ideas of reference, social withdrawal) but lacks sustained psychosis, and with autism (social difficulties) but the driver is paranoia and magical thinking, not communication deficits.",
        "A pervasive pattern of social and interpersonal deficits with cognitive-perceptual distortions and behavioral eccentricities: magical thinking, ideas of reference, unusual perceptions, odd speech, suspiciousness, odd behavior. At least 5 of 9 criteria, present since early adulthood. Limited insight into oddness."
      ],
      teach:"Schizotypal PD sits on the schizophrenia spectrum and is genetically linked to it. No sustained psychotic episodes distinguishes it from schizophrenia. Distinct from ASD: the eccentricity in schizotypal is driven by magical thinking and suspicion, not social-communication deficits."
    },
    {
      id:"hard-arfid", date:"2026-06-20", answer:"Avoidant/Restrictive Food Intake Disorder",
      accept:["avoidant restrictive food intake disorder","arfid","avoidant/restrictive food intake disorder","avoidant restrictive food intake disorder arfid"],
      clues:[
        "A 16-year-old is referred for significant weight loss. Their diet has always been limited to about eight \"safe\" foods — all beige, no sauces, no mixed textures — but recently they've eliminated three more foods after a frightening gagging episode at dinner.",
        "They're not afraid of gaining weight and have no body image concerns. They don't diet. Most foods are simply intolerably aversive — wrong texture, smell, or appearance triggers gagging or intense anxiety.",
        "They eat their safe foods without problem but refuse everything else even when hungry. Social eating is nearly impossible: they've skipped school events, avoided friend gatherings, and can't eat at restaurants.",
        "The pediatrician notes a BMI in the underweight range with iron and vitamin deficiencies. The pattern predates adolescence: \"they were an extremely selective eater as a toddler\" — long before any weight concerns could logically arise.",
        "Anxiety and sensory sensitivity profiles point toward a neurodevelopmental underpinning. A structured autism screen is pending. The restriction is not explained by a medical condition, food unavailability, or cultural practice.",
        "Consider what is absent: no fear of weight gain, no body image disturbance. This distinguishes the presentation sharply from anorexia, where food restriction is weight-motivated.",
        "Restriction of food intake based on sensory characteristics of food — resulting in significant weight loss, nutritional deficiency, and psychosocial impairment — without any body image disturbance. No medical condition accounts for the restriction."
      ],
      teach:"ARFID has three subtypes: sensory sensitivity (this case), fear of aversive consequences (choking/vomiting), and low interest in food. The critical differentiator from anorexia: no fear of weight gain driving restriction. Common comorbidity with ASD and anxiety disorders."
    },
    {
      id:"hard-bdd", date:"2026-06-19", answer:"Body Dysmorphic Disorder",
      accept:["body dysmorphic disorder","bdd","body dysmorphic disorder bdd","body dysmorphia"],
      clues:[
        "A 21-year-old comes in having sought cosmetic consultations with five surgeons in the past two years. Every surgeon declined to operate, saying they couldn't see the flaw the client describes.",
        "They're convinced their nose is asymmetrical in a way that makes them \"repulsive.\" They spend three to four hours daily checking it in mirrors, photographing it, and comparing themselves to others online.",
        "They've withdrawn from college and rarely leave the apartment. They're certain strangers stare at their nose on the street and have taken to wearing a hat pulled low over their face.",
        "On gentle confrontation, they acknowledge that others say they see nothing — but feel certain those people are wrong or just being kind. Reality testing is partially preserved but insight is poor.",
        "Preoccupation with a perceived defect that is not observable or appears slight to others, plus repetitive behaviors (mirror checking, comparing, reassurance-seeking) in response — causing significant distress and impairment.",
        "The checking rituals provide no relief and have escalated. Cosmetic procedures sought by clients with BDD rarely provide lasting benefit — the preoccupation typically migrates to another feature.",
        "Ruling out: OCD (the preoccupation is specifically about appearance, not a broader range of intrusive content), delusional disorder (partial reality testing preserved), anorexia (the concern is a specific feature, not overall body weight)."
      ],
      teach:"BDD is an OCD-spectrum disorder with high impairment and suicide risk. The perceived flaw is minimal or absent to observers, but the client's distress is genuine and intense. Distinguish from normative appearance concerns by time spent (hours daily) and functional impairment. Insight specifier matters for treatment planning."
    },
    {
      id:"hard-rad", date:"2026-06-18", answer:"Reactive Attachment Disorder",
      accept:["reactive attachment disorder","rad","reactive attachment disorder rad","reactive attachment"],
      clues:[
        "A 7-year-old in foster care is referred for \"refusing to bond.\" The current foster family reports the child doesn't seek comfort when hurt, shows no preference for them over strangers, and doesn't appear upset when the foster mother leaves.",
        "The child smiles rarely, rarely makes eye contact during nurturing interactions, and doesn't look to adults to share enjoyment during play. When distressed, they self-soothe by rocking rather than approaching caregivers.",
        "History: the child spent their first three years with a biological parent who was severely neglectful — irregular feeding, no response to crying, no consistent caregiver. They were removed at age 3.",
        "Developmental screening shows average cognitive ability. The flat, wary presentation appeared in early childhood and predates the foster placement — it isn't a reaction to this specific placement.",
        "A structured ASD assessment is negative. The child does respond socially in low-demand, low-novelty contexts with familiar peers — the withdrawal is relational and attachment-specific, not pervasive across all social interaction.",
        "The foster family is emotionally exhausted and starting to take the rejection personally. Psychoeducation about the origins of attachment dysregulation is a critical early intervention.",
        "Consistent pattern of inhibited, emotionally withdrawn behavior toward caregivers: rarely seeking or responding to comfort when distressed — plus persistent social-emotional disturbance (minimal social reciprocity, positive affect, and affect regulation) — resulting from severe early neglect of attachment needs."
      ],
      teach:"RAD results from pathogenic care (neglect, deprivation of attachment needs) before age 5. Distinguish from ASD: in RAD the social withdrawal is relational and attachment-specific, not pervasive. Distinguish from DSED (the other pathogenic-care diagnosis): DSED shows indiscriminate attachment to strangers rather than inhibited attachment to all."
    },
    {
      id:"hard-selective-mutism", date:"2026-06-17", answer:"Selective Mutism",
      accept:["selective mutism","elective mutism","selective mutism disorder"],
      clues:[
        "A 6-year-old girl has not spoken a single word to any teacher or classmate since starting kindergarten eight months ago. She participates in activities non-verbally and follows all instructions.",
        "At home with her immediate family she is talkative, animated, and fully age-appropriate in language. Her parents describe her as \"a completely different child\" at home.",
        "The teacher assumed it would resolve on its own. It hasn't — the child now communicates at school by pointing and whispering to her mother, who has begun attending school to \"translate.\" The accommodation is reinforcing the avoidance.",
        "Evaluation rules out a language disorder (home speech is age-appropriate), autism spectrum disorder (she is socially engaged at home and responsive non-verbally at school), and hearing loss.",
        "She shows visible physiological anxiety when called on in class — freezes, breaks eye contact, and shakes slightly. The failure to speak is not defiance or a voluntary choice.",
        "Consider the classification: this is an anxiety disorder, not a communication disorder or a conduct problem. The child can speak, does speak in safe contexts, and the failure to speak in school is driven by anxiety, not inability.",
        "Consistent failure to speak in specific social situations where speech is expected (school), despite speaking in other contexts (home) — lasting over one month, not limited to the first month of school, and causing educational and social impairment."
      ],
      teach:"Selective mutism is classified under anxiety disorders in DSM-5. Key: the child CAN speak and DOES speak in some contexts. The silence is anxiety-driven, not voluntary refusal. Early intervention is important — the pattern becomes self-reinforcing, and school accommodations (like parent attendance) can inadvertently maintain it."
    },
    {
      id:"hard-illness-anxiety", date:"2026-06-16", answer:"Illness Anxiety Disorder",
      accept:["illness anxiety disorder","health anxiety","hypochondria","hypochondriasis","illness anxiety"],
      clues:[
        "A 40-year-old comes in requesting a specialist referral. They've been convinced for three months that occasional fatigue and mild headaches signal a brain tumor.",
        "They've researched brain tumors extensively, check their pupils in the mirror daily, and have visited their PCP four times in three months. Each reassurance lasts about two days before the worry returns.",
        "After a normal MRI, they feel relief for about a week — then begin wondering whether it missed something, and shift to worrying about a different, harder-to-detect cancer.",
        "Somatic symptoms are minimal — the fatigue and headaches are mild and intermittent. The distress is almost entirely about what the symptoms might mean, not about the symptoms themselves.",
        "Over the past year the illness focus has shifted at least twice: from heart disease to multiple sclerosis to now brain tumor. Family members are exhausted by the repeated health scares.",
        "Consider what distinguishes this from Somatic Symptom Disorder: in SSD, distress centers on prominent, distressing somatic symptoms. Here, the somatic complaints are mild — the preoccupation is with the feared disease itself.",
        "Preoccupation with having or acquiring a serious illness, high health anxiety, easy alarm about health status — with excessive health-related checking behaviors despite mild or absent somatic symptoms, lasting ≥6 months, with shifting illness focus."
      ],
      teach:"Illness Anxiety Disorder (formerly hypochondriasis) is distinguished from Somatic Symptom Disorder by the relative absence of prominent somatic symptoms — the preoccupation is with the feared disease. The illness focus commonly shifts over time. Reassurance provides only brief relief and can reinforce the cycle."
    }
  ]
};

const MAX = { easy:5, medium:6, hard:7 };
const LABEL = { easy:"Easy", medium:"Medium", hard:"Hard" };
const DIFFS = ["easy","medium","hard"];
