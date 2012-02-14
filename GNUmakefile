export PRJ_ROOT = $(shell pwd)

BEM ?= bem

pg_prefix ?= pages/
pg_techs ?= html css ie.css js

pg_src_tech ?= bemjson.js

pg_levels ?= blocks \
	typo \
	$(@D)/blocks

src = $(wildcard $(pg_prefix)*/*.$(pg_src_tech))
pages := $(dir $(src))

create = $(BEM) create block \
	-f \
	-l $(pg_prefix) \
	$(*F)

build_output_flags = -o $(@D) -n $(*F)

build = $(BEM) build \
	$(addprefix -l , $(pg_levels)) \
	$(build_output_flags)


all: $(pages)
	@echo All done

.PHONY: $(pages)
$(pages):
	@echo Building $@; \
		$(MAKE) $(foreach suffix, $(pg_techs), $(addsuffix .$(suffix), $@$(shell basename $@)))

.jdepend: build_output_flags = -o $(dir $(decl)) -n $(notdir $(decl:%.deps.js=%))
.jdepend: cmd = $(build) -d $(decl) -t tools/techs/d.js
.jdepend:
	$(foreach decl, $(src:$(pg_src_tech)=deps.js), $(cmd))


-include $(src:%.bemjson.js=%.d)


# bem tools rules

# FIXME: `make -B` will try to rebuild targets from `.d` files

%.html: %.bemhtml.js
	@echo === $@

%.bemhtml.js: %.deps.js
	@echo === Building $< - $@

.PRECIOUS: %.deps.js
%.deps.js: %.bemdecl.js
	$(build) -d $< -t deps.js
	$(build) -d $@ -t tools/techs/d.js

%.bemdecl.js: %.bemjson.js; $(create) -t bemdecl.js

%.css: %.deps.js; $(build) -d $< -t css

%.ie.css: %.deps.js; $(build) -d $< -t ie.css

%.js: %.deps.js; $(build) -d $< -t js

#%.d: $(addprefix %.,deps.js js css)
#	rm -f $@; \
#	$(build) -d $< -t tools/techs/d.js


clean:
	-@ $(RM) -f $(filter-out %.$(pg_src_tech), $(wildcard $(src:%.$(pg_src_tech)=%.*)))

.PHONY: all clean .jdepend

.SECONDARY: %.css %.js

