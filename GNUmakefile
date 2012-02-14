export PRJ_ROOT = $(shell pwd)

BEM ?= bem

pg_prefix ?= pages/
pg_tech_suffixes ?= html css ie.css js

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
$(pages): ; @echo $@; $(MAKE) $(foreach s, $(pg_tech_suffixes), $(addsuffix .$(s), $@$(shell basename $@)))

#.PHONY: .depend
#.depend: ; build_output_flags = -o $(output) -n $(name); cmd = $(build) -d $(decl) -t tools/techs/d.js;
#.depend: $(pages)
#	$(foreach decl, $(addsuffix $(shell basename $<).deps.js, $<), $(cmd))

-include $(src:%.bemjson.js=%.d)


# bem tools rules

$(pg_prefix)%.html: $(pg_prefix)%.bemhtml.js
	@echo === $@

$(pg_prefix)%.bemhtml.js: $(pg_prefix)%.deps.js
	@echo === Building $< - $@

.PRECIOUS: $(pg_prefix)%.deps.js
$(pg_prefix)%.deps.js: $(pg_prefix)%.bemdecl.js
	$(build) -d $< -t deps.js
	$(build) -d $@ -t tools/techs/d.js

$(pg_prefix)%.bemdecl.js: $(pg_prefix)%.bemjson.js; $(create) -t bemdecl.js

$(pg_prefix)%.css: $(pg_prefix)%.deps.js; $(build) -d $< -t css

$(pg_prefix)%.ie.css: $(pg_prefix)%.deps.js; $(build) -d $< -t ie.css

$(pg_prefix)%.js: $(pg_prefix)%.deps.js; $(build) -d $< -t js

#$(pg_prefix)%.d: $(addprefix $(pg_prefix)%.,deps.js js css)
#	rm -f $@; \
#	$(build) -d $< -t tools/techs/d.js


# XXX: filter-out sub dirs
clean:
	-@ $(RM) -rf $(filter-out %.$(pg_src_tech), $(wildcard $(pg_prefix)*/*))

.PHONY: all clean

.SECONDARY: %.css %.js

