export type showPasswordState = boolean

export type signUpState = {
    fullName:string,
    email:string,
    password:string
}

export type SignInState={
    email:string
    password:string
}

export type ThemesState = 
  "light"|
  "dark"|
  "cupcake"|
  "bumblebee"|
  "emerald"|
  "corporate"|
  "synthwave"|
  "retro"|
  "cyberpunk"|
  "valentine"|
  "halloween"|
  "garden"|
  "forest"|
  "aqua"|
  "lofi"|
  "pastel"|
  "fantasy"|
  "wireframe"|
  "black"|
  "luxury"|
  "dracula"|
  "cmyk"|
  "autumn"|
  "business"|
  "acid"|
  "lemonade"|
  "night"|
  "coffee"|
  "winter"|
  "dim"|
  "nord"|
  "sunset"
;