BEM ?= bem

pg_prefix ?= pages/
pg_tech_suffixes ?= html css ie.css js

pg_src_tech ?= bemhtml.js

pg_levels ?= blocks \
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

all : $(pages)
	@echo All done

.PHONY: $(pages)
$(pages) : ; @echo $@; $(MAKE) $(foreach s, $(pg_tech_suffixes), $(addsuffix .$(s), $@$(shell basename $@)))

-include $(src:%.bemjson.js=%.d)

# bem tools rules

%.html : %.bemhtml.js
	@echo === $@

%.bemhtml.js : %.deps.js
	@echo "==== $@ < $<"
	$(build) -d $@ -t tools/techs/d.js

.PRECIOUS: %.deps.js
%.deps.js : %.bemdecl.js
	$(build) -d $< -t deps.js

%.bemdecl.js : %.bemjson.js; $(create) -t bemdecl.js

%.css : %.deps.js; $(build) -d $< -t css

%.ie.css : %.deps.js; $(build) -d $< -t ie.css

%.js : %.deps.js; $(build) -d $< -t js

%.d : %.deps.js %.html %.js %.css
	rm -f $@; \
	$(build) -d $< -t tools/techs/d.js

clean :
	-@ $(RM) -rf $(filter-out $(pg_src_tech), $(wildcard $(pg_prefix)*/*))

.PHONY: all clean

.SECONDARY: %.css %.js

