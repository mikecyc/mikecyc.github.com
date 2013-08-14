<!--
.. title: 两个非常有用的Bash脚本编程命令
.. slug: strong-bash
.. date: 2013/08/13 15:55:02
.. tags: Bash, 编程, 命令
.. link: http://cclw.net/gospel/explore/WhyJesus/WhyJesus.html
-->

Shell脚本可以完成很多任务，但因为Shell脚本运行时遇到异常还是会继续运行，这些问题有时很难发现，所以有两个命令可以帮助你来调试脚本，这是非常有用的命令。

## 命令一：使用 Set -u

你有没有因为一个变量没有初始化而经常崩溃？我知道我有，而且很多次。

    ::bash
    chroot=$1
    ...
    rm -rf $chroot/usr/share/doc

如果你忘记初始化一个变量就运行上面的脚本，你将会删除所有的系统文件，而不是只在chroot目录下的文档。你要做些什么呢？幸运的是bash为您提供了`set -u`，当你尝试使用一个未初始化的变量将会自动退出脚本。

    ::bash
    mike% bash /tmp/shrink-chroot.sh
    $chroot=
    mike% bash -u /tmp/shrink-chroot.sh
    /tmp/shrink-chroot.sh: line 3: $1: unbound variable
    mike%

<!-- TEASER_END -->
    
## 命令二：使用 Set -e

你写的每一个脚本都应该在开始包含`set -e`。这告诉bash如果任何一语句返回一个非真的值将退出脚本。使用`-e`的好处是它可以防止滚雪球般的变成严重错误，能尽快地捕获到错误。

使用`-e`来检查错误为把你释放出来。如果你忘了检查，bash将为你做。不幸的是这意味着你不能检查`$?`返回值，因为你得不到值如果返回不是为零的话。你可以使用另外一种结构：

    ::bash
    command
    if [ "$?"-ne 0]; then echo "command failed"; exit 1; fi

可以替换成

    ::bash
    command || { echo "command failed"; exit 1; }
    
或者
    
    ::bash
    if ! command; then echo "command failed"; exit 1; fi

如果你有一个命令需要返回非零值，或者你对返回值不感兴趣？你可以使用`command || true`，或者你有一段很长的代码，你可以暂时关闭错误检查，但我建议你谨慎使用。

    ::bash
    set +e
    command1
    command2
    set -e

相关文档说明，默认情况下bash返回管道中最后一个命令的值，也许不是你想要的结果。例如，`false | true`会被视为成功执行。如果你想让命令执行失败，可以使用`set -o pipefail`。
