当我使用position时，最外层wrapper无法自动扩大高度填充，用了overflow也不行，这时候，就需要用float来实现三栏布局了。

使用float布局时，中间栏div应放在左右两栏div之后，并且中间div使用margin。

position用在脱离文档流，独立呈现时，例如左右两侧的盒子。