bem-make
========

_Just for fun_

== Synopsis

An attempt for creation of simple but powerfull build-platform for a common
(http://github.com/bem)[BEM] project.

The core of the platform is simple (well, no so, actually) GNUmakefile, which is
a set of just (http://github.com/bem/bem-tools)[bem-tools] command calls.

== Consept of usage

    $ make

Will build all pages inside `pg_prefix` level.

    $ make pages/index/

To build one page only with sets of it's techs, defined as `pg_techs`.

    $ make pages/index/index.html

To build only one of page's tech.

    $ make .jdepend

To generate dependancies for all pages. Dependancies are just another make files
that describe resources page is consist of. A more about concept of
auto-dependancies generation read
http://www.gnu.org/software/make/manual/make.html#Automatic-Prerequisites.

Dependancies are generated with *d.js* tech (see `tools/techs/d.js` for code).

    $ make clean

Clean `pages` level from all generated content.

